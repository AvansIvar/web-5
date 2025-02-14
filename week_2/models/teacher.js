var mongoose = require('mongoose');

// Schema
var teacherSchema = new mongoose.Schema({
	_id: { type: String , required: true, lowercase: true},
	firstName: { type: String, required: true },
	middleName: { type: String },
	lastName: { type: String, required: true },
	age: { type: Number, min: 0, max: 100 },
	isActive: { type: Boolean },
	courses: [{ type: String, required: true, ref: 'Course' }]
},
// Settings
{
    toObject: { virtuals: true },
    toJson: { virtuals: true}
});

// Validation
teacherSchema.path('lastName').validate(function (val) {
    return val && this.firstName != val;
}, 'Last name must differ from first name.');

// Virtual
teacherSchema.virtual('fullname').get(function(){
    var fullName = this.firstName + ' ';
    if (this.middleName && this.middleName.length){
        fullName += this.middleName + ' ';
    }
    fullName += this.lastName;

    return fullName;
});

mongoose.model('Teacher', teacherSchema);