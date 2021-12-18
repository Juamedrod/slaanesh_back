/**
 * API/MAZE
 */
const router = require('express').Router();
const Maze = require('../../models/maze.model');

router.post('/', async (req, res) => {
    try {
        let maze;
        maze = await Maze.findOneAndUpdate({ userId: req.body.userId }, req.body);
        if (!maze) {
            maze = await Maze.create(req.body);
        }
        res.json(maze);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const maze = await Maze.findOne({ userId: req.params.id });
        if (maze) return res.json(maze.maze);
        res.json({ error: 'Empty maze, fill it' });
    } catch (error) {
        res.json({ error: error.message });
    }
});


module.exports = router;