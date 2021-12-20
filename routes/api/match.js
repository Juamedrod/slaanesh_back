const router = require('express').Router();
const Match = require('../../models/match.model');
const Maze = require('../../models/maze.model');
const { getMaze } = require('../../utils');

router.post('/new', async (req, res) => {
    try {
        const maze1 = await Maze.findOne({ userId: req.body.player1Id });
        const activeCards1 = [];
        const tempMaze1 = maze1.toObject();
        for (let index = 0; index < 6; index++) {
            const random = Math.trunc(Math.random() * tempMaze1.maze.length);
            activeCards1.push(tempMaze1.maze[random]);
            tempMaze1.maze.splice(random, 1);
        }
        const maze2 = await Maze.findOne({ userId: req.body.player2Id });
        const tempMaze2 = maze2.toObject();
        const activeCards2 = [];
        for (let index = 0; index < 6; index++) {
            const random = Math.trunc(Math.random() * tempMaze2.maze.length);
            activeCards2.push(tempMaze2.maze[random]);
            tempMaze2.maze.splice(random, 1);
        }
        const match = {
            player1: {
                userId: req.body.player1Id,
                maze: tempMaze1.maze,
                activeCards: activeCards1
            },
            player2: {
                userId: req.body.player2Id,
                maze: tempMaze2.maze,
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

});

router.delete('/:matchId', async (req, res) => {
    try {
        const response = await Match.findByIdAndRemove(req.params.matchId);
        console.log(response);
        res.json({ success: 'success' });
    } catch (error) {
        res.json({ error: error.message });
    }
});


module.exports = router;