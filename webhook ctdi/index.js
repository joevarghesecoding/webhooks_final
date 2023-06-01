const dotenv = require("dotenv");
const express = require("express");
const axios = require("axios").default;
const emailReader = require('./emailReader/emailReader')

const app = express();
const port = 3000;

app.use(express.json());
dotenv.config();


const getContent = async () => {
    try{
        let content = await emailReader.getEmails();
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
