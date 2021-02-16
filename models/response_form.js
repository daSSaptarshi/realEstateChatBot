const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ResponseShema = new Schema({
	Form_Id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
	User_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	Budget_Range: { type: Array },
	Specification: { type: String },
	Limitation: { type: String },
	Query: { type: String, maxlength: 300 },
});

module.exports = mongoose.model('Response_form', ResponseShema);
