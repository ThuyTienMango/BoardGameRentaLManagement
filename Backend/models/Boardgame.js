const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardgameSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        ages: { type: Number, required: true },
        playerMin: { type: Number, required: true},
        playerMax: { type: Number, required: true},
        length: {type: Number, required: true},
        quantity: {type: Number, required: true},
        image: { type: String, required: true },
        imageUrl: { type: String, required: true },
    }, {
        timestamps: true, }
);

module.exports = mongoose.model('Boardgame', boardgameSchema);




