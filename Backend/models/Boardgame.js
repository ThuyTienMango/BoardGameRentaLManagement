const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Boardgame = new Schema(
    {
        name: { type: String, required: true, },
        image: { type: String },
        description: { type: String },
        price: { type: String, required: true, },
        ages: { type: String },
        playerMin: { type: Number},
        playerMax: { type: Number},
        length: {type: Number},
        slug: { type: String, slug: 'name', unique: true },
    }, {
        timestamps: true, }
);

module.exports = mongoose.model('Boardgame', Boardgame);




