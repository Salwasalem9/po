const dotenv = require('dotenv');
dotenv.config();

const port = 8080;

var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js');

// Start up an instance of app
const app = express();


const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

console.log(__dirname);

// API
const linkurl = 'https://api.meaningcloud.com/sentiment-2.1?lang=en&';
const mykeyapi = process.env.API_KEY;
console.log(`API ${process.env.API_KEY}`);
let userInput = []; 

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});

app.post('/api', async (req, res) => {
  const linkinput = req.body.url;

  const result = await fetch(`${linkurl}key=${mykeyapi}&url=${linkinput}`)
    .then((response) => response.json())
    .then((datatext) => {
      console.log(`Agreement: ${datatext.agreement}`);
      console.log(`Subjectivity: ${datatext.subjectivity}`);
      console.log(`Confidence Rate: ${datatext.confidence}`);
      console.log(`Score tag: ${datatext.score_tag}`);
      res.send(datatext);
    });
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});