var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = 8000;
app.listen(port);
var router = express.Router();
app.use("/api", router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
console.log('listening on ' + port);

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'paul',
    database : 'blue'
});

connection.connect();



router.route("/elders")
    .get(function(req, res) {
        connection.query('select * from elders', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        })
    })
    .post(function(req, res){
        connection.query('insert into elders (name, location) values(' + req.body.name + ',' + req.body.location + ')', function(err, rows, fields) {
            if (err) throw err;
            res.send(rows);
        })
    });


//app.get('/api/requests', function(req, res) {
//    connection.query('select * from requests', function(err, rows, fields) {
//        if (err) throw err;
//        res.send(rows);
//    });
//});
//
//app.get('/api/elders', function(req, res) {
//    connection.query('select * from elders', function(err, rows, fields) {
//        if (err) throw err;
//        res.send(rows);
//    });
//});
//
//app.get('/api/volunteers', function(req, res) {
//    connection.query('select * from volunteers', function(err, rows, fields) {
//        if (err) throw err;
//        res.send(rows);
//    });
//});
//
//app.get('/api/volunteers/:id', function(req, res) {
//    connection.query('select * from volunteers where volunteerid =' + req.params.id, function(err, rows, fields) {
//        if (err) throw err;
//        res.send(rows[0]);
//    });
//});
//
//app.delete("/api/volunteers/:id",function(req, res){
//    connection.query('delete from volunteers where volunteerid=' + req.params.id, function(err, rows, fields) {
//        if (err) throw err;
//        res.send(rows);
//        console.log(rows)
//    });
//});
//
//app.put("/api/volunteers", function(req, res){
//    console.log("put");
//    res.send("put");
//});
