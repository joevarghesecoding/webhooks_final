const Imap = require('imap');
const mailparser = require('mailparser').simpleParser;
const readEmails = require('./readEmail.js')
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();

const imap = new Imap({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: 'imap-mail.outlook.com',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false
      },
    // requireTLS: true,
    debug: console.log
});

let emailText;
let emailSubject;
let emailSender;

// const getEmails = async () => {
//     try{
//         const imap = new Imap(mailConfig);
//         imap.connect();
//         imap.on('ready', () => {
//             imap.openBox('INBOX', () =>{
//                 imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
//                     const f = imap.fetch(results, {bodies: ''});
//                     f.on('message', msg => {
//                         msg.on('body', stream => {
//                             mailparser(stream, async (err, parsed) =>{
//                                 //console.log(parsed.text);
//                                 emailSubject = parsed.subject;
//                                 emailText = parsed.text;
//                                 emailSender = parsed.from;
//                                 // console.log('emailSender ' + emailSender);
//                                 // console.log('emailSubject ' + emailSubject);
//                                 // console.log('emailText ' + emailText);
//                                 try{
//                                     return new Promise(async resolve => {
//                                         let result = await readEmails.readEmail(emailSender, emailSubject, emailText);
//                                         console.log("result " + JSON.stringify(result))
//                                         resolve(result);
//                                     })
//                                 } catch(error) {
//                                     console.log(error);
//                                 }
                                
//                             })
//                         })
//                         msg.once('attributes', attrs => {
//                             const {uid} = attrs;
//                             imap.addFlags(uid, ['\\Seen'], () => {
//                                 console.log('Marked as read!');
//                             })
//                         })
//                     })
//                     f.once('error', ex => {
//                         return Promise.reject(ex);
//                     })
//                     // f.once('end', () => {
//                     //     console.log('Done fetching all messages');
//                     //     imap.end();
//                     // })
//                 })
//             })   
//         })
//         imap.once('error', err => {
//             console.log(err);
//         })
//         imap.once('end', () => {
//             console.log('Connection ended');
//         })
//     } catch (ex) {
//         console.log('an error occured');
//     }
// }

const openInbox = (cb) => {
    imap.openBox('INBOX', true, cb);
}

const getEmails = async () => {
    imap.connect();
    imap.once('ready', () => {
        openInbox( (err, box) => {
            if(err) {
                console.log('openInbox err:');
                throw err;
            }
            imap.search(['UNSEEN', new Date()], (err, results) => {
                if(err){
                    console.log('imap.search err:')
                    throw err;
                }
                let fetch = imap.fetch(results, { bodies: ''})
                fetch.on('message', (msg, seqno) => {
                    console.log('Message #%d', seqno);
                    let prefix = '(#' + seqno + ')';
                    msg.on('body', (stream, info) => {
                        console.log(prefix + 'Body')
                        stream.pipe(fs.createWriteStream('msg-' + seqno + '-body.txt'));
                    } )
                    msg.once('attributes', function(attrs) {
                        console.log(prefix + 'Attributes: %s', inspect(attrs, false, 8));
                    });
                    msg.once('end', function() {
                        console.log(prefix + 'Finished');
                    });
                    msg.once('end', function() {
                        console.log(prefix + 'Finished');
                    });
                });
                fetch.once('error', function(err) {
                    console.log('Fetch error: ' + err);
                });
                // fetch.once('end', function() {
                //     console.log('Done fetching all messages!');
                //     imap.end();
                // });
              
            })
        })
        console.log('imap is idle');
        imap.idle();     
    })
    
    
}

getEmails().then(result => {
    return result;
});

module.exports = {
    getEmails
}