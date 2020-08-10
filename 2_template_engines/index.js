var express = require('express');
var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res) {
    res.render('index', {
        name: 'Welt'
    });
});

app.get('/users', function(req, res) {
    res.render('users/index', {
        users: [
            { id: 1, name: 'Cat'},
            { id: 2, name: 'Dog'},
            { id: 3, name: 'Fish'}
        ]
    })
});

app.listen(port, function() {
    console.log('Server listening on port' + port);
});