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
            if(err)res.send(false);
            else res.send(true);
        });
    })
    .get(function(req, res){
        connection.query('select * from elders', function(err, rows, fields){
            res.send(rows);
        });
    })
    .delete(function(req, res){
        connection.query('delete from elders where elderid =' + req.body.elderid, function(err, rows, fields){
            if(err)res.send(false);
            else res.send(true);
        });
    })
    .put(function(req, res){
        connection.query('update elders set name = \'' + req.body.name + '\', location=\'' + req.body.location + '\' where elderid =' + req.body.elderid, function(err, rows, fields){
            if(err)res.send(false);
            else res.send(true);
        });
    });

router.route('/volunteers')
    .post(function (req, res) {
        connection.query('insert INTO volunteers (name) VALUES (\'' + req.body.name + '\')', function(err, rows, fields) {
            if(err)res.send(false);
            else res.send(true);
        });
    })
    .get(function(req, res){
        connection.query('select * from volunteers', function(err, rows, fields){
            res.send(rows);
        });
    })
    .delete(function(req, res){
        connection.query('delete from volunteers where volunteerid =' + req.body.volunteerid, function(err, rows, fields){
            if(err)res.send(false);
            else res.send(true);
        });
    })
    .put(function(req, res){
        connection.query('update volunteers set name = \'' + req.body.name + '\' where volunteerid =' + req.body.volunteerid, function(err, rows, fields){
            if(err)res.send(false);
            else res.send(true);
        });
    });

router.route('/requests')
    .post(function (req, res) {
        connection.query('insert INTO requests (elderid, volunteerid, location, time) VALUES (' + req.body.elderid + ',' + req.body.volunteerid + ',\'' + req.body.location + '\',\'' + req.body.time + '\')', function(err, rows, fields) {
            if(err)res.send(false);
            else res.send(true);
        });
    })
    .get(function(req, res){
        connection.query('select requestid,elderid,volunteerid,location,DATE_FORMAT(time,\'%Y-%c-%d %T\') AS time  from requests', function(err, rows, fields){
            res.send(rows);
            console.log(rows[0]);
        });
    })
    .delete(function(req, res){
        console.log('delete from requests where requestid = ' + req.body.id);
        connection.query('delete from requests where requestid = ' + req.body.requestid, function(err, rows, fields){
            if(err)res.send(false);
            else res.send(true);
        });
    })
    .put(function(req, res){
        connection.query('update requests set volunteerid = ' + req.body.volunteerid + ',elderid = ' + req.body.elderid + ',location =\'' + req.body.location + '\',time = \'' + req.body.time + '\' where requestid = ' + req.body.requestid, function(err, rows, fields){
            if(err)res.send(false);
            else res.send(true);
        });
    });

app.get('*', function(req, res){
    res.sendFile('client/html/404.html', { root : "./"});
});

