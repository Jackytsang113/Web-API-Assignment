const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, require: true, unique: true},
        fullname: { type: String, require: true},
        phone: { type: String, require: true},
        email: { type: String, require: true},
        password: { type: String, require: true}
    },
    { collection: 'users' }
)

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;