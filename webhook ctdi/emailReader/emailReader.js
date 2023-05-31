const Imap = require('imap');
const mailparser = require('mailparser').simpleParser;
const readEmails = require('./readEmail.js')

const mailConfig = {
    user: 'ctdimodelblock@outlook.com',
    password: 'Bjgjvkvmrvcyokkf',
    host: 'imap-mail.outlook.com',
    port: 993,
    tls: true,
    tlsOptions: {
        rejectUnauthorized: false
      },
    // requireTLS: true,
    debug: console.log
};

let emailText;
let emailSubject;
let emailSender;

const getEmails = async () => {
    try{
        const imap = new Imap(mailConfig);
        imap.connect();
        imap.on('ready', () => {
            imap.openBox('INBOX', () =>{
                imap.search(['UNSEEN', ['SINCE', new Date()]], (err, results) => {
                    const f = imap.fetch(results, {bodies: ''});
                    f.on('message', msg => {
                        msg.on('body', stream => {
                            mailparser(stream, async (err, parsed) =>{
                                //console.log(parsed.text);
                                emailSubject = parsed.subject;
                                emailText = parsed.text;
                                emailSender = parsed.from;
                                // console.log('emailSender ' + emailSender);
                                // console.log('emailSubject ' + emailSubject);
                                // console.log('emailText ' + emailText);
                                try{
                                    return new Promise(async resolve => {
                                        let result = await readEmails.readEmail(emailSender, emailSubject, emailText);
                                        console.log("result " + JSON.stringify(result))
                                        resolve(result);
                                    })
                                } catch(error) {
                                    console.log(error);
                                }
                                
                            })
                        })
                        msg.once('attributes', attrs => {
                            const {uid} = attrs;
                            imap.addFlags(uid, ['\\Seen'], () => {
                                console.log('Marked as read!');
                            })
                        })
                    })
                    f.once('error', ex => {
                        return Promise.reject(ex);
                    })
                    // f.once('end', () => {
                    //     console.log('Done fetching all messages');
                    //     imap.end();
                    // })
                })
            })   
        })
        imap.once('error', err => {
            console.log(err);
        })
        imap.once('end', () => {
            console.log('Connection ended');
        })
    } catch (ex) {
        console.log('an error occured');
    }
}

getEmails().then(result => {
    return result;
});

exports.getEmails = getEmails;