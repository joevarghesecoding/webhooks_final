const dotenv = require("dotenv");
const express = require("express");
const axios = require("axios").default;
const emailReader = require('./emailReader/emailReader')

const app = express();
const port = 3000;

app.use(express.json());
dotenv.config();


// let content = {
//   "type": "message",
//   "attachments":[  
//          {  
//             "contentType":"application/vnd.microsoft.card.adaptive",  
//             "contentUrl":null,  
//             "content":{  
//                "$schema":"http://adaptivecards.io/schemas/adaptive-card.json",  
//                "type":"AdaptiveCard",  
//                "version":"1.2",  
//                "body": [
//                 {
//                     "type":"TextBlock",
//                     "style": "large",
//                     "weight": "bolder",
//                     "text": "Model Block"
//                 },
//                 {
//                     "type":"ColumnSet",
//                     "columns": [
//                         {
//                             "type":"Column",
//                             "separator": true,
//                             "spacing": "medium",
//                             "items": [
//                                 {
//                                     "type": "Column",
//                                     "width": "stretch",
//                                     "items": [
//                                         {
//                                             "type": "TextBlock",
//                                             "text" : "Model",
//                                             "wrap" : "true"
//                                         },
//                                         {
//                                             "type": "TextBlock",
//                                             "text": "Function",
//                                             "wrap": "true"
//                                         },
//                                         {
//                                             "type": "TextBlock",
//                                             "text": "REV",
//                                             "wrap": "true"
//                                         },
//                                         {
//                                             "type": "TextBlock",
//                                             "text": "Slot",
//                                             "wrap": "true"
//                                         }
//                                     ]
//                                 }
//                             ]
//                         },
//                         {
//                             "type": "Column",
//                             "width": "auto",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "iPhone14,5",
//                                     "horizontalAlignment": "right",
//                                     "isSubtle": true,
//                                     "weight": "bolder",
//                                     "wrap": true
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "InCall_Speaker",
//                                     "horizontalAlignment": "right",
//                                     "isSubtle": true,
//                                     "weight": "bolder",
//                                     "wrap": true
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "96",
//                                     "horizontalAlignment": "right",
//                                     "isSubtle": true,
//                                     "weight": "bolder",
//                                     "wrap": true
//                                 },
//                                 {
//                                 "type": "TextBlock",
//                                 "text": "5",
//                                 "horizontalAlignment": "right",
//                                 "isSubtle": true,
//                                 "weight": "bolder",
//                                 "wrap": true
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//             }  
//          }  
//       ]  
//     }

const getContent = async () => {
    try{
        let content = emailReader.getEmails();
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log("content " + JSON.stringify(content));
        return content;
    } catch(error) {
        console.log(error);
    }
}

let content = getContent();
// console.log("content " + content);

    axios.post(process.env.TEAMS_WEBHOOK_URL, content)
    .then((teamsResponse) => {
      console.log("Success!");
      //res.status(204).send();
    })
    .catch((err) => console.error(`Error sending to teams: ${err}`));




app.listen(port, () =>
  console.log(`Test app listening at http://localhost:${port}`)
);
