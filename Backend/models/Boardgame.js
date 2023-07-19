const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

const boardgameSchema = new Schema(
    {
        Id: { type: String, default: shortid.generate },
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        ages: { type: Number, required: true },
        playerMin: { type: Number, required: true},
        playerMax: { type: Number, required: true},
        length: {type: Number, required: true},
        quantity: {type: Number, required: true},
        // image: { type: String },
        // imageUrl: { type: String },
        images: { type: Array },
        imageUrls: { type: Array },
    }, {
        timestamps: true, }
);

module.exports = mongoose.model('Boardgame', boardgameSchema);




