var mongoose = require('mongoose');
const userModel = mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    role: String
});

export default mongoose.model('user', userModel)