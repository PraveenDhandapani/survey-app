const mongoose = require('mongoose');
const { Schema } = mongoose; //destructuring const schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: String
});

mongoose.model('users', userSchema);