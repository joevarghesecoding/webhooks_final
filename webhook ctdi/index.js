const express = require("express");
const axios = require("axios").default;
const emailReader = require('./emailReader/emailReader')
require('dotenv').config();

const app = express();
const port = 3778;

app.use(express.json());

emailReader.startMessageLoop();
// emailReader.getEmails().then((content) => {
//   axios.post(process.env.TEAMS_WEBHOOK_URL, content)
//   .then((teamsResponse) => {
//     console.log("SUCCESS");
//   })
//   .catch((err) => {
//     console.log(`Error sending to teams: ${err}`);
//     console.log(err.response.status);
//     console.log(err.response.data);
//   })
// });

app.listen(port, () =>
  console.log(`Outgoing webhook listening at http://localhost:${port}`)
);
