const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: { type: String},
        password: { type: String },
        email: { type: String, required: true },
        name: { type: String, required: true, },
        ID_card: { type: String, required: true },
        image: { type: String },
        age: { type: Number },
        phone_number: { type: Number, required: true },
        address: { type: String, required: true}
    }, {
        timestamps: true, }
);

module.exports = mongoose.model('User', userSchema);




