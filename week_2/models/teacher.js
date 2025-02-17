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

// Queries
teacherSchema.query.byPage = function (pageSize, pageIndex) {
    return this.find()
        .limit(parseInt(pageSize))
        .skip(pageIndex * pageSize);
};

teacherSchema.query.byName = function () {
    return this.find()
        .sort({firstName : 1})
};

// Middleware
teacherSchema.pre('save', function(next) {
    console.log('Teacher will be saved.');
    next();
    console.log('Teacher is saved.');
})

mongoose.model('Teacher', teacherSchema);