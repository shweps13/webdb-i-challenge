const express = require('express');
const helmet = require('helmet');

const Router = require("./router")

const server = express();

const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Was method "${req.method}" to address "${req.path}"`);
    next();
}

server.use(express.json());
server.use(helmet());
server.use(logger);
server.use("/api/accounts", Router)

server.get('/', (req, res) => {
    res.send('<h3>Hello from Heorhiis server!</h3>');
  });

module.exports = server;