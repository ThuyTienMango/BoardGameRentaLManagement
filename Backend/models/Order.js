const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    customerId: {
      type: String,
      required: true
    },
    productId: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    productImage: {
      type: String,
      required: true
    },
    productPrice: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
      },
    quantity: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    orderStatus: {
      type: String,
    //   required: true
    },
    notes: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);
