const Imap = require('imap');
const { simpleParser } = require('mailparser');
const mailparser = require('mailparser').simpleParser;
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

const getEmails = async () => {
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
                    let f = imap.fetch(results, { bodies: ''});
                    f.on('message',  (msg, seqno) => {
                        msg.once('body', async (stream, info) => {
                            parsed = await simpleParser(stream);
                            console.log("parsed inside " +parsed.text);
                            resolve(parsed);
                        })
                    });
                    f.on('error' , (error) => {
                        console.log('fetch error ' + error);
                    });
                    f.on('end', () => {
                        console.log('Done fetching all messages');
                        //imap.end();
                    });
                });
            });
            imap.on('error', err => {
                console.log(err);
            });
            // imap.on('end', () => {
            //     console.log('Connection ended');
            // });
        });
        })
}

module.exports = {
    getEmails
}