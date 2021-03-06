var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');

var adapter = new FileSync('db.json');

var db = low(adapter);

db.defaults({ users: [] })
  .write();

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.render('index', {
        name: 'Welt'
    });
});

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: db.get('users').value()
    });
});

app.get('/users/search', function(req, res) {
    var q = req.query.q;
    var matchedUsers =users.filter(function(user) {
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('users/index', {
        users: matchedUsers
    });
    // console.log(req.query);
});

app.get('/users/create', function(req, res) {
    res.render('users/create');
});

app.post('/users/create', function(req, res) {
    db.get('users').push(req.body).write();
    res.redirect('/users');
    // console.log(req.body);
});

app.listen(port, function() {
    console.log('Server listening on port' + port);
});

// REV