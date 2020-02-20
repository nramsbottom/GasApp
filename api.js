var express = require('express')
var router = express.Router()
var Sqlite3 = require('better-sqlite3');

var db = new Sqlite3('./data/prices.db', {
	fileMustExist: false
});

router.use(express.json());

// define the home page route
router.post('/price', function (req, res) {

	if (req.body === undefined) {
		res.sendStatus(400).end();
		return;
	}

	var now = new Date().toISOString();
	var price = req.body.price;
	
	var result = db.prepare("INSERT INTO price (date, value) VALUES (?, ?)").run(now, price);
	var id = result.lastInsertRowid;
	
	res.location('/api/price/' + id)
		.sendStatus(201)
		.end();
})

// define the about route
router.get('/price', function (req, res) {
		
	// get most recent price
	var result = db.prepare("SELECT * FROM price ORDER BY id DESC LIMIT 1").get();
	
  	res.status(200).send({
		last_price: result.value,
		date: result.date
	});
})

module.exports = router