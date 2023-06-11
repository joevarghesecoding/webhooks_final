const emailReader = require('./emailReader/emailReader')
require('dotenv').config();

const content = emailReader.getEmails().then((text) => {
    console.log("text inside testing " + text);
});
console.log(content);
