const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema(
    {
        username: { type: String, require: true},
        foodname: { type: String, require: true},
        description: { type: String, require: true},
        comment: { type: String, require: true}
    },
    { collection: 'userfavorite' }
)

const model = mongoose.model('FavoriteSchema', FavoriteSchema);

module.exports = model;