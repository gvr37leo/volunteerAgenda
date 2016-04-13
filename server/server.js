var mysql = require("mysql");
var express = require("express");
var app = express();
var port = 8000;
app.listen(port);
console.log('listening on ' + port);

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'paul',
    database : 'blue'
});

connection.connect();

//connection.query('select * from actor', function(err, rows, fields) {
//    if (err) throw err;
//    console.log(rows);
//    //rows.forEach(function(row){
//    //    console.log(row);
//    //});
//});

app.get('/', function(req, res) {
    console.log(req.query);
    res.send('hello world');
});
