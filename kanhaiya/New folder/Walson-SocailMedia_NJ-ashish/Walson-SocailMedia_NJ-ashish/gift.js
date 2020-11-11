var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var app = express();
// all environments
app.set('port', process.env.PORT || 4000);
//app.set('views', __dirname + 'views');
//app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(express.methodOverride());


//app.use('/new', require('./routes/welcome.js'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static('blog_detail'));
//mongo connection
mongoose.connect('mongodb://localhost/Company');

//schema
var Schema = new mongoose.Schema({

    gift : Number

});
var user = mongoose.model('gift', Schema);
//get routes
/*app.get('/mak', function(req, res){
    res.render('about');
    });
*/

  app.get('/mak', function(req, res){
        user.find({}, function(err, docs){
        if(err) res.json(err);
        else res.render('about', {users: docs});
        });
        });
//post routes
app.post('/new', function(req, res){
new user({

gift: req.body.gift,

}).save(function(err, doc){
if(err) res.json(err);
else res.redirect('/mak')
});
});



//final
var server = http.createServer(app).listen(app.get('port'), function(){ console.log('Express server listening on port ' + app.get('port'));
});
