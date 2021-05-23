const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        username: { type: String, require: true},
        foodname: { type: String, require: true},
        price: { type: String, require: true}
    },
    { collection: 'order' }
)

const model = mongoose.model('OrderSchema', OrderSchema);

module.exports = model;