// REQUIREMENTS
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var session = require('express-session');
var path = require('path');
var app = express();

//POINT SERVER TO VIEWS
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, './static')));
// app.use(session({secret: 'mysecret'}));
mongoose.connect('mongodb://localhost/Quoting_Dojo');

// SCHEMA FOR QUOTE
var QuoteSchema = new mongoose.Schema({
	name: String,
	quote: String
});
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote');



//SET UP ROUTES
app.get('/', function(req, res){
	res.render('index');
});

app.post('/quotes', function(req, res){
	console.log('POST DATA', req.body);
	var quotes = new Quote({name:req.body.name, quote:req.body.quote});
	quotes.save(function(err){
		if(err){
			console.log('Something went wrong getting that quote');
		}
		else{
			console.log('Yay you got that quote!');
			res.redirect('/quotes');
		}
	});
})

app.get('/quotes', function(req, res){
	Quote.find({}, function(err, quotes){
		if(err){
			console.log('Something went wrong getting that quote');
		}
		else{
			console.log('You got it!');
			res.render('main', {quotes:quotes});
		}
	});
});

// WHERE YOU AT
app.listen(8000, function() {
    console.log('listening on port 8000');
  });