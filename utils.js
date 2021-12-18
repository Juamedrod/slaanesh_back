const Maze = require('./models/maze.model');

const getMaze = async (id) => {
    return Maze.findOne({ userId: req.params.id });
}

module.exports = { getMaze };