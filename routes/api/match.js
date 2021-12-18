const router = require('express').Router();
const Match = require('../../models/match.model');
const Maze = require('../../models/maze.model');
const { getMaze } = require('../../utils');

router.post('/new', async (req, res) => {
    try {
        const maze1 = await Maze.findOne({ userId: req.body.player1Id });
        const maze2 = await Maze.findOne({ userId: req.body.player2Id });
        const match = {
            player1: {
                userId: req.body.player1Id,
                maze: maze1.maze
            },
            player2: {
                userId: req.body.player2Id,
                maze: maze2.maze
            }
        }
        const response = await Match.create(match);
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

module.exports = router;