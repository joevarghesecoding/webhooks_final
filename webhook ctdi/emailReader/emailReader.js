const Imap = require('imap');
const { simpleParser } = require('mailparser');
const axios = require("axios").default;
require('dotenv').config({path: '../.env'});

const imap = new Imap({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: 'imap-mail.outlook.com',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false
      },
    // requireTLS: true,
    debug: console.log,
    // keepalive: {
    //     interval: 5000,
    //     idleInterval: 300000,
    //     forceNoop: true
    // }
});

const readEmails = (resolve, reject) => {
    imap.search(['UNSEEN', ['SINCE', new Date()]],  (err, results) => {
        if(err) {
            console.log('error at search');
            throw err;
        }

        if(!results || !results.length) {
            console.log('No unread emails');
            imap.end();
            return;
        }
        let f = imap.fetch(results, { bodies: ''});
        f.once('message',  (msg, seqno) => {
            msg.once('body', async (stream, info) => {
                let parsed;
                parsed = await simpleParser(stream);
                //console.log("parsed inside " +parsed.text);
                resolve(parsed);
            });
            msg.once('attributes', attrs => {
                const {uid} = attrs;
                imap.addFlags(uid, ['\\Seen'], () => {
                    console.log('Marked as read!');
                })
            })
        });
        f.once('error' , (error) => {
            console.log('fetch error ' + error);
            return reject(error);
        });
        f.once('end', () => {
            console.log('Done fetching all messages');
            imap.end();
            return;
        });
    });
}

const getEmails = () => {
    return new Promise((resolve, reject) => {
        imap.connect();
        imap.once('ready',  () => {
            console.log('Mail service listening');
            imap.openBox('INBOX', false,  (err, box) => {
                if(err) {
                    console.log('error at ready ' + err);
                }
                readEmails(resolve, reject);
            });
            imap.once('error', err => {
                console.log(err);
            });
            imap.once('end', ()=> {
                imap.removeAllListeners();
                console.log('Listener ended');
                imap.end();

            })
        });
        console.log('Mail service ended');
    })
}

function startSearching(){
    getEmails()
        .then((content) => {
            axios.post(process.env.TEAMS_WEBHOOK_URL, content)
            .then((teamsResponse) => {
              console.log("SUCCESS");
            })
            .catch((err) => {
              console.log(`Error sending to teams: ${err}`);
              console.log(err.response.status);
              console.log(err.response.data);
            })
          });
}

function startMessageLoop() {
    const checkInterval = 15000;
    startSearching();
    setInterval(() => {
        startSearching();
    }, checkInterval);
}

module.exports = {
    getEmails,
    startMessageLoop
}