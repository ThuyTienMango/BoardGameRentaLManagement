const mongoose = require('mongoose');
const shortid = require('shortid');

const Schema = mongoose.Schema;

orderSchema = new Schema(
  {
      Id: { type: String, default: shortid.generate },
      customerId: { type: String, required: true },
      productId: { type: String, required: true },
      duration: { type: Number, required: true },
      quantity: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      orderStatus: { type: Number, required: true },
      progressTime: {
        created: { type: Date },
        confirmed: { type: Date },
        payment: { type: Date },
        due: { type: Date },
        completed: { type: Date }
      }
  },
  {
      timestamps: true,
  }
);


module.exports = mongoose.model('Order', orderSchema);