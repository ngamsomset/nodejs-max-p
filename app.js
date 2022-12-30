const http = require('http')
const routes = require('./routes')
const express = require('express')

const app = express()

const server = http.createServer(app);

server.listen(3000);