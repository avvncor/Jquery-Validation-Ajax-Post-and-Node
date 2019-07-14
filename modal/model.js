const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    email:{type:String, required:true},
    qualification:{type:String, required:true}
})

module.exports = mongoose.model('user',userSchema,'user')