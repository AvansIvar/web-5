var express = require('express');
var _ = require('underscore');
var router = express();

var mongoose = require('mongoose');
var Teacher = mongoose.model('Teacher');
var Course = mongoose.model('Course');

function getTeachers(req, res) {
	var query = {};

	// Using populate to fill the courses field with actual course documents
	Teacher.find(query).populate('courses')
	.then(data => {
		res.json(data);
	})
	.catch(err => {
		console.log('Error: ' + err.message);
		res.status(500).send(err.message);
	});
}

function addTeacher(req, res){
    var teacher = new Teacher(req.body);
    console.log(req.body);
	teacher
		.save()
		.then(savedTeacher => {
			res.status(201);
			res.json(savedTeacher);
		})
		.fail(err => {
			res.status(500);
			console.log(err);
			res.json(err.errors);
		});
}

// Routing
router.route('/')
	.get(getTeachers)
	.post(addTeacher);

// Export
module.exports = router;
