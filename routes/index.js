var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('clicks', { title: 'In the clouds' });
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

/* GET clicks page. */
router.get('/clicks', function(req, res) {
	res.render('clicks', {title: 'Add CS'});
});

/* POST store click. */
router.post('/clouds', function(req, res) {
	var db = req.db;

	var x = req.body.x;
	var y = req.body.y;

	var col = db.collection('coordinates');
	col.insert({
		"x": x,
		"y": y
	}, function (err, doc) {
		if (err) {
			res.send("Problem adding entry to database");
		}
		else {
			console.log('success');
			res.end('ok');
		}
	});
});

/* GET all stored clicks. */
router.get('/clouds', function(req, res) {
	var db = req.db;
	var col = db.collection('coordinates');
	col.find().toArray(function(e, docs) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(docs));
	});
});

/* DELETE *all* clicks. */
router.delete('/clouds', function(req, res) {
	var db = req.db;
	var col = db.collection('coordinates');
	col.remove({}, function (err, doc) {
		res.send('Items deleted');
	});
});

module.exports = router;
