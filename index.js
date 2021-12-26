const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { createServer } = require("http");
const { Server } = require("socket.io");

/**
 * Global Configs
 */
require('dotenv').config();
require('./dbConfig');

/**
 * APP initialization
 */
const app = express();
const httpServer = createServer(app);
global.io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:4200", "https://slaanesh.netlify.app/"],
        methods: ["GET", "POST"]
    }
});

/**
* Routers imports
*/
const apiRouter = require('./routes/api');

/**
 * Express Config
 */
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

/**
 * Routing
 */
app.use('/api', apiRouter);

/**
 * IO listening
 */
httpServer.listen((process.env.PORT || 3000), () => {
    console.log('Server listening on port', (process.env.PORT || 3000))
});