var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET ping page. */
router.get('/ping', function(req, res) {
	res.render('ping', { title: 'pong!', date: new Date() })
});

/* GET users page. */
router.get('/users', function(req, res) {
	var db = req.db;
	var col = db.collection('usercollection');
	col.find().toArray(function(e, docs) {
		res.render('users', {
			"users" : docs
		});
	});
});

/* GET input page. */
router.get('/newuser', function(req, res) {
	res.render('newuser', {title: 'Insert New User'});
});

/* POST to add User. */
router.post('/adduser', function(req, res) {
	var db = req.db;

	var userName = req.body.username;
	var userEmail = req.body.useremail;

	var col = db.collection('usercollection');

	col.insert({
		"username" : userName,
		"email" : userEmail
	}, function (err, doc) {
		if (err) {
			res.send("Problem adding entry to database.")
		}
		else {
			res.redirect("users")
		}
	});
});

module.exports = router;
