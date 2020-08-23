var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var low = require('lowdb');
var shortid = require('shortid');
var _ = require('underscore');

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

app.get('/users/:id', function(req, res) {
    var id = (req.params.id);
    // console.log(typeof id);

    var user = db.get('users').find({ id: id }).value();

    res.render('users/view.pug', {
        user: user
    });
});

app.post('/users/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
    // console.log(req.body);
});

app.delete('/users/:id/delete', function (req, res) {
    var id = (req.params.id);
    var matchedUsers = _.findWhere(users, { id: id });

    if (!matchedUsers) {
        res.status(404).json({ "error": "no user found with that id" })
    } else {
        users = _.findWhere(users, matchedUsers);
        res.json(matchedUsers);
    }
    res.redirect('/users');
});

app.listen(port, function() {
    console.log('Server listening on port' + port);
});

// REV