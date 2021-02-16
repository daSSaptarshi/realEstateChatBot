const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserShema = new Schema({
	User_type: { type: String, required: true, maxlength: 15 },
	User_Id: { type: Schema.Types.ObjectId },
	Name: { type: String, required: true, maxlength: 30 },
	Contact_no: { type: Number, required: true },
	Address: { type: String, maxlength: 100 },
	City: { type: String, maxlength: 20 },
	State: { type: String, maxlength: 15 },
	Country: { type: String, maxlength: 20 },
	Pin_code: { type: Number },
	Email: { type: String, required: true },
});

module.exports = mongoose.model('User', UserShema);