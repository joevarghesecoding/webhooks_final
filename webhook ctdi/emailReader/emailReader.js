const Imap = require('imap');
const { simpleParser } = require('mailparser');
const axios = require("axios").default;
require('dotenv').config({path: '../.env'});

const imap = new Imap({
    // user: process.env.USERNAME,
    // password: process.env.PASSWORD,
    user: 'ctdimodelblock@outlook.com',
    password: 'Bjgjvkvmrvcyokkf',
    host: 'imap-mail.outlook.com',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false
      },
    // requireTLS: true,
    //debug: console.log
});

const getEmails = () => {
    return new Promise((resolve, reject) => {
        let parsed;
    
        imap.connect();
        imap.once('ready',  () => {
            console.log('Mail service listening');
            imap.openBox('INBOX', false,  (err, box) => {
                if(err) {
                    console.log('error at ready ' + err);
                }
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
        })
}

function startMessageLoop() {
    const checkInterval = 5000;
    setInterval(() => {
        getEmails().then((content) => {
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
    }, checkInterval);
}

module.exports = {
    getEmails,
    startMessageLoop
}