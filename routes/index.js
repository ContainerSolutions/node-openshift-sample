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
	var collection = db.get('usercollection');
	collection.find({},{},function(e,docs){
		res.render('users', {
			"users" : docs
		});
	});
});


module.exports = router;
