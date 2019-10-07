const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());



server.get('/', (req, res) => {
    res.send('<h3>Hello from Heorhiis server!</h3>');
  });

server.get('/api/accounts', (req, res) => {

    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

server.get('/api/accounts/:id', (req, res) => {
    db('accounts')
    .where('id', '=', req.params.id)
    .first()
    .then(account => {
      res.status(200).json(account);
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

server.put('/api/accounts/:id', (req, res) => {
    db('accounts')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
        res.status(200).json(count);
    })
    .catch(error => {
        res.status(500).json(error);
    });

});

server.delete('/api/accounts/:id', (req, res) => {
    db('accounts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
        res.status(200).json(count);
    })
    .catch(error => {
        res.status(500).json(error);
    });

});


module.exports = server;