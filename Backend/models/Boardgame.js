const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const boardgameSchema = new Schema(
    {
        name: { type: String, required: true, },
        image: { type: String },
        description: { type: String },
        price: { type: Number, required: true, },
        ages: { type: String },
        playerMin: { type: Number},
        playerMax: { type: Number},
        length: {type: Number},
    }, {
        timestamps: true, }
);

module.exports = mongoose.model('Boardgame', boardgameSchema);




