const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
    {
        foodname: { type: String, require: true, unique: true},
        description: { type: String, require: true},
        price: { type: String, require: true}
    },
    { collection: 'foods' }
)

const model = mongoose.model('foodSchema', foodSchema);

module.exports = model;