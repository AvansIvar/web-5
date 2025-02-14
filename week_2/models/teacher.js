var mongoose = require('mongoose');

var teacherSchema = new mongoose.Schema({
	_id: { type: String , required: true, lowercase: true},
	firstName: { type: String, required: true },
	middleName: { type: String },
	lastName: { type: String, required: true },
	age: { type: Number, min: 0, max: 100 },
	isActive: { type: Boolean },
	courses: [{ type: String, required: true, ref: 'Course' }]
});
mongoose.model('Teacher', teacherSchema);