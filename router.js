const express = require("express");
const db = require("./data/dbConfig.js");
const router = express.Router();

// ===== Middleware =====
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

// ===== CRUD operations =====

router.get('/', (req, res) => {

    db('accounts')
    .then(accounts => {
        res.status(200).json(accounts);
    })
    .catch(error => {
        res.status(500).json(error);
    })
});

router.get('/:id', validateAccountID, (req, res) => {
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

router.post('/', validateAccountData, (req, res) => {
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

router.put('/:id', validateAccountID, (req, res) => {
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

router.delete('/:id', validateAccountID, (req, res) => {
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

module.exports = router;