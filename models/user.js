const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	firstName: {type:String, required: true},
	lastName: {type:String, required: true},
	email: {type:String, required: true},
	password: {type:String, required: true},
	permissionLevel: Number
});

//export model(name, schema) - allow to interact with database
module.exports = mongoose.model('User',userSchema)