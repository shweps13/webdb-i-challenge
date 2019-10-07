const express = require('express');
const helmet = require('helmet');

const db = require('./data/dbConfig.js');

const server = express();

// ===== Middleware =====
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Was method "${req.method}" to address "${req.path}"`);
    next();
}

const validateAccountID = async (req,res,next) => {
    const { id } = req.params;
    try {
        const account = await db("accounts")
            .where({ id })
            .first()
        if(account) {
            req.account = account
            next()
        }
        else {
            res.status(400).json({ message: "Please provide a valid ID" })
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error: could not retrieve account" })
    }
}

const validateAccountData = (req,res,next) => {
    const {body} = req;

    if(!body.name || !body.budget){
        res.status(400).json({message: "Please provide a name and budget"})
    }
    else if (typeof body.budget !== "number") {
        res.status(400).json({message: "Budget must be a number"})
    }
    else {
        next()
    }
}
// ===


server.use(express.json());
server.use(helmet());
server.use(logger);


// ===== CRUD operations =====
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

server.get('/api/accounts/:id', validateAccountID, (req, res) => {
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

server.post('/api/accounts', validateAccountData, (req, res) => {
    const postData = req.body;

    db('accounts')
    .insert(postData, 'id')
    .then(ids => {
        res.status(200).json(ids);
    })
    .catch(error => {
        res.status(500).json(error);
    });

});

server.put('/api/accounts/:id', validateAccountID, (req, res) => {
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

server.delete('/api/accounts/:id', validateAccountID, (req, res) => {
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