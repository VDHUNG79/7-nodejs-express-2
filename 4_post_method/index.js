var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var users = [
    { id: 1, name: 'Cat'},
    { id: 2, name: 'Dog'},
    { id: 3, name: 'Fish'}
];

app.get('/', function(req, res) {
    res.render('index', {
        name: 'Welt'
    });
});

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: users
    })
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
    users.push(req.body);
    res.redirect('/users');
});

app.listen(port, function() {
    console.log('Server listening on port' + port);
});