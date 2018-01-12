var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var mongoose = require('mongoose');
mongoose.connect('mongodb://genya:genya@ds251197.mlab.com:51197/gflem')
    //mongoose.connect('mongodb://localhost:27017/db4');
var equipmentSchema = new mongoose.Schema({
    rare: Number,
    name: String,
    category: String
});

var equipment = mongoose.model('equipment', equipmentSchema);
/*
var itemOne = Todo({item:'buy flowers'}).save(function(err){
  if (err) throw err;
  console.log('item saved ...');
});

var data=[{item:'get milk'}, {item:'prepare class'}, {item:'go swimming'}];
*/
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    console.log('server start..');
    equipment.find({}, function(err, data) {
        if (err) throw err;
        console.log('server start at get /index..');
        res.render('index', { data: data });
    });
});

app.get('/equipment', function(req, res) {
    equipment.find({}, function(err, data) {
        if (err) throw err;
        console.log('server start at get /equipment..');
        res.render('equipment', { data: data });
    });
});

app.post('/equipment', urlencodedParser, function(req, res) {
    var newEquipment = equipment(req.body).save(function(err, data) {
        if (err) throw err;
        console.log('server  at post /equipment..');
        res.redirect('/equipment');
    });

});



app.get('/add', function(req, res) {
    console.log('server start..');
    res.render('add', { data: req.query });
});

app.listen(3000);