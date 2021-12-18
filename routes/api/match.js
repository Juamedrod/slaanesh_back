const router = require('express').Router();
const Match = require('../../models/match.model');
const Maze = require('../../models/maze.model');
const { getMaze } = require('../../utils');

router.post('/new', async (req, res) => {
    try {
        let tempMaze;
        const maze1 = await Maze.findOne({ userId: req.body.player1Id });
        const activeCards1 = [];
        tempMaze = maze1.toObject();
        for (let index = 0; index < 6; index++) {
            activeCards1.push(tempMaze.maze[Math.trunc(Math.random() * tempMaze.maze.length)]);
        }
        const maze2 = await Maze.findOne({ userId: req.body.player2Id });
        tempMaze = maze2.toObject();
        const activeCards2 = [];
        for (let index = 0; index < 6; index++) {
            activeCards2.push(tempMaze.maze[Math.trunc(Math.random() * tempMaze.maze.length)]);
        }
        const match = {
            player1: {
                userId: req.body.player1Id,
                maze: maze1.maze,
                activeCards: activeCards1
            },
            player2: {
                userId: req.body.player2Id,
                maze: maze2.maze,
                activeCards: activeCards2
            },
            userActiveturn: req.body.player1Id
        }
        const response = await Match.create(match);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.put('/', async (req, res) => {
    try {
        const response = await Match.findOneAndUpdate({ _id: req.body._id }, req.body);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const response = await Match.findById(req.query.id);
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const response = await Match.findOne({ $or: [{ 'player2.userId': req.params.id }, { 'player1.userId': req.params.id }] });
        res.json(response);
    } catch (error) {
        res.json({ error: error.message });
    }
});

global.io.on("connection", (socket) => {
    socket.on('join', (data) => {
        console.log('new connection in room: ', socket.id);
        socket.join(data.matchId);
    });

    socket.on('ActionPerformed', async (data) => {
        global.io.to(data.matchId).emit("recieveAction", data);//aqui mando a los clientes la informacion
    });

    socket.on('forceDisconnect', function () {
        socket.disconnect(true);
    });


    socket
});

module.exports = router;