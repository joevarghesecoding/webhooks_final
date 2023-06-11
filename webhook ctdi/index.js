const express = require("express");
const axios = require("axios").default;
const emailReader = require('./emailReader/emailReader')
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

// const sendContent = async () => {
//   // emailReader.getEmails().then((content) => {
//   //   axios.post(process.env.TEAMS_WEBHOOK_URL, content)
//   //   .then((teamsResponse) => {
//   //     console.log("SUCCESS");
//   //   })
//   //   .catch((err) => {
//   //     console.log(`Error sending to teams: ${err}`);
//   //     console.log(err.response.status);
//   //     console.log(err.response.data);
//   //   })
//   // });
// }

emailReader.startMessageLoop();

app.listen(port, () =>
  console.log(`Test app listening at http://localhost:${port}`)
);
