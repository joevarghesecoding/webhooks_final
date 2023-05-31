const adaptiveCards = require("adaptivecards");

// let cards = {
//     "type": "AdaptiveCard",
//     "version": "1.0",
//     "body": [
//         {
//             "type":"TextBlock",
//             "style": "large",
//             "weight": "bolder",
//             "text": "Model Block"
//         },
//         {
//             "type":"ColumnSet",
//             "columns": [
//                 {
//                     "type":"Column",
//                     "separator": true,
//                     "spacing": "medium",
//                     "items": [
//                         {
//                             "type": "Column",
//                             "width": "stretch",
//                             "items": [
//                                 {
//                                     "type": "TextBlock",
//                                     "text" : "Model",
//                                     "wrap" : "true"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "Function",
//                                     "wrap": "true"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "REV",
//                                     "wrap": "true"
//                                 },
//                                 {
//                                     "type": "TextBlock",
//                                     "text": "Slot",
//                                     "wrap": "true"
//                                 }
//                             ]
//                         }
//                     ]
//                 },
//                 {
//                     "type": "Column",
//                     "width": "auto",
//                     "items": [
//                         {
//                             "type": "TextBlock",
//                             "text": "iPhone14,5",
//                             "horizontalAlignment": "right",
//                             "isSubtle": true,
//                             "weight": "bolder",
//                             "wrap": true
//                         },
//                         {
//                             "type": "TextBlock",
//                             "text": "InCall_Speaker",
//                             "horizontalAlignment": "right",
//                             "isSubtle": true,
//                             "weight": "bolder",
//                             "wrap": true
//                         },
//                         {
//                             "type": "TextBlock",
//                             "text": "96",
//                             "horizontalAlignment": "right",
//                             "isSubtle": true,
//                             "weight": "bolder",
//                             "wrap": true
//                         },
//                         {
//                         "type": "TextBlock",
//                         "text": "5",
//                         "horizontalAlignment": "right",
//                         "isSubtle": true,
//                         "weight": "bolder",
//                         "wrap": true
//                         }
//                     ]
//                 }
//             ]
//         }
//     ]
// }

const makeRev2ModelBlockCard = async (station, slot_id, model, test ) => {
    let card = {
        "type": "AdaptiveCard",
        "version": "1.0",
        "body": [
            {
                "type":"TextBlock",
                "style": "large",
                "weight": "bolder",
                "text": "REV2 Model Block"
            },
            {
                "type":"ColumnSet",
                "columns": [
                    {
                        "type":"Column",
                        "separator": true,
                        "spacing": "medium",
                        "items": [
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text" : "Model",
                                        "wrap" : "true"
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": "Function",
                                        "wrap": "true"
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": "REV",
                                        "wrap": "true"
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": "Slot",
                                        "wrap": "true"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Column",
                        "width": "auto",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": `${model}`,
                                "horizontalAlignment": "right",
                                "isSubtle": true,
                                "weight": "bolder",
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": `${test}`,
                                "horizontalAlignment": "right",
                                "isSubtle": true,
                                "weight": "bolder",
                                "wrap": true
                            },
                            {
                                "type": "TextBlock",
                                "text": `${station}`,
                                "horizontalAlignment": "right",
                                "isSubtle": true,
                                "weight": "bolder",
                                "wrap": true
                            },
                            {
                            "type": "TextBlock",
                            "text": `${slot_id}`,
                            "horizontalAlignment": "right",
                            "isSubtle": true,
                            "weight": "bolder",
                            "wrap": true
                            }
                        ]
                    }
                ]
            }
        ]
    }

//     let content = {
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

    let aCard = new adaptiveCards.AdaptiveCard();

    aCard.hostConfig = new adaptiveCards.HostConfig({
        fontFamily: "Segoe UI, Helvetica Neue, sans-serif"
    });

    aCard.parse(card)
    const jsonString = JSON.stringify(aCard);
    console.log("aCard " + jsonString);
    return aCard;

}

module.exports = {
    makeRev2ModelBlockCard
}
