const _ = require('lodash');
const express = require('express');

const cors = require('cors');

const bodyParser = require('body-parser');

const Coin = require('./coin');

var app = express();

const responseMiddleware = (req, res, next) => {
    return res.json(req.responseValue);
}

app.use(cors());

app.use(bodyParser.json());

app.get('/', function (req, res, next) {
    res.status(200).send('Block-Chain Nodejs Example');
})

app.post('/transactions/new', Coin.newTransaction, responseMiddleware);


app.get('/lasttransaction', Coin.lastTransaction, responseMiddleware);

app.get('/mine', Coin.mine, responseMiddleware);

app.get('/chain', Coin.getChain, responseMiddleware)


app.listen(3500, () => {
    console.log('Server starts listening on port: ' + 3500);
});