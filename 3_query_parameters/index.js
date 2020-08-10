var express = require('express');
var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

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

app.listen(port, function() {
    console.log('Server listening on port' + port);
});