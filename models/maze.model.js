const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    avatar: { type: String, required: true },
    cardName: { type: String, required: true },
    cardQuote: { type: String, required: true },
    cardType: { type: String, required: true },
    lives: { type: Number, required: true },
    defense: { type: Number, required: true },
    attack: { type: Number, required: true },
    rarity: { type: String }
})

const mazeSchema = new Schema({
    userId: String,
    maze: [cardSchema]
})

module.exports = mongoose.model('maze', mazeSchema);