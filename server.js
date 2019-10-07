const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());



server.get('/', (req, res) => {
    res.send('<h3>Hello from Heorhiis server!</h3>');
  });

server.get('/api/accounts', (req, res) => {

    db.select('*')
    .from('accounts')
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

server.post('/api/accounts', (req, res) => {
    const postData = req.body;
    //validate the data

    db('accounts')
    .insert(postData, 'id')
    .then(ids => {
        res.status(200).json(ids);
    })
    .catch(error => {
        res.status(500).json(error);
    });

});

module.exports = server;