const express = require("express");
const axios = require("axios").default;
const emailReader = require('./emailReader/emailReader')
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.json());

emailReader.startMessageLoop();

app.listen(port, () =>
  console.log(`Test app listening at http://localhost:${port}`)
);
