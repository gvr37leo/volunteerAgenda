var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./client'));
var router = express.Router();
app.use('/api', router);

app.listen(port);
console.log('listening on ' + port);

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'paul',
    database : 'blue'
});

connection.connect();

app.get("/", function(req, res){
    res.sendFile("client/html/elders.html", { root : "./"})
});

app.get("/elders", function(req, res){
    res.sendFile("client/html/elders.html", { root : "./"})
});

app.get("/volunteers", function(req, res){
    res.sendFile("client/html/volunteers.html", { root : "./"})
});

app.get("/requests", function(req, res){
    res.sendFile("client/html/requests.html", { root : "./"})
});

router.route('/elders')
    .post(function (req, res) {
        connection.query('insert INTO elders (name, location) VALUES (\'' + req.body.name + '\',\'' + req.body.location + '\')', function(err, rows, fields) {
            res.send('posted');
        });
    })
    .get(function(req, res){
        connection.query('select * from elders', function(err, rows, fields){
            res.send(rows);
        });
    })
    .delete(function(req, res){
        connection.query('delete from elders where elderid =' + req.body.id, function(err, rows, fields){
            res.send('deleted');
        });
    })
    .put(function(req, res){
        connection.query('update elders set name = \'' + req.body.name + '\', location=\'' + req.body.location + '\' where elderid =' + req.body.id, function(err, rows, fields){
            res.send('updated');
        });
    });

router.route('/volunteers')
    .post(function (req, res) {
        connection.query('insert INTO volunteers (name) VALUES (\'' + req.body.name + '\')', function(err, rows, fields) {
            res.send('posted');
        });
    })
    .get(function(req, res){
        connection.query('select * from volunteers', function(err, rows, fields){
            res.send(rows);
        });
    })
    .delete(function(req, res){
        connection.query('delete from volunteers where volunteerid =' + req.body.id, function(err, rows, fields){
            res.send('deleted');
        });
    })
    .put(function(req, res){
        connection.query('update volunteers set name = \'' + req.body.name + '\' where volunteerid =' + req.body.id, function(err, rows, fields){
            res.send('updated');
        });
    });

router.route('/requests')
    //.post(function (req, res) {
    //    connection.query('insert INTO volunteers (name) VALUES (\'' + req.body.name + '\')', function(err, rows, fields) {
    //        res.send('posted');
    //    });
    //})
    .get(function(req, res){
        connection.query('select * from requests', function(err, rows, fields){
            res.send(rows);
        });
    })
    //.delete(function(req, res){
    //    connection.query('delete from volunteers where volunteerid =' + req.body.id, function(err, rows, fields){
    //        res.send('deleted');
    //    });
    //})
    //.put(function(req, res){
    //    connection.query('update volunteers set name = \'' + req.body.name + '\' where volunteerid =' + req.body.id, function(err, rows, fields){
    //        res.send('updated');
    //    });
    //});

