const Maze = require('./models/maze.model');

const getMaze = async (id) => {
    return Maze.findOne({ userId: req.params.id });
}

class Action {
    constructor(matchId, initCardId, targetCardID, action, turn) {
        this.matchId = matchId;
        this.initCardId = initCardId;
        this.targetCardID = targetCardID;
        this.action = action;
        this.turn = turn;
    }
}

module.exports = { getMaze, Action };