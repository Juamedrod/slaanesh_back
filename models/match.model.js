const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    avatar: { type: String },
    cardName: { type: String },
    cardQuote: { type: String },
    cardType: { type: String },
    lives: { type: Number },
    defense: { type: Number },
    attack: { type: Number }
})

const matchSchema = new Schema({
    player1: { type: mongoose.Mixed },
    player2: { type: mongoose.Mixed },
    userActiveturn: String,
})

module.exports = mongoose.model('match', matchSchema);