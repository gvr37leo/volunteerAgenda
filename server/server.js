var mysql = require("mysql");
var express = require("express");
var bodyParser = require("body-parser");
var jsonSql = require('json-sql')({
    separatedValues:false,
    namedValues:false,
    //wrappedIdentifiers:false,
    dialect:"mysql"
});
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
    res.sendFile("client/html/requests.html", { root : "./"})
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

require("./general")(router,connection,"elders","elderid");
require("./general")(router,connection,"volunteers","volunteerid");
require("./general")(router,connection,"requesttype","requestTypeid");
require("./CRUD/request")(router,connection,jsonSql);
//generalize doest work for request because of the weird way it returns dates with the select query

app.get('*', function(req, res){
    res.sendFile('client/html/404.html', { root : "./"});
});

function deleteEmptyKeys(object){
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            if(object[key] == "" || object[key] == undefined){
                delete object[key];
            }
        }
    }
}

function generateUpdate(table, array,reqbody ,isintarray, id){
    //'update elders set name = \'' + req.body.name + '\', location=\'' + req.body.location + '\' where elderid =' + req.body.elderid
    var string = 'update ' + table + ' set ';
    for(var i = 0; i < array.length; i++){
        if(reqbody[array[i]] == undefined || reqbody[array[i]] == ""){
            string += array[i] + ' = NULL,';
            continue;
        }
        if(isintarray[i]){
            string += array[i] + ' = ' + reqbody[array[i]]
        }else{
            string += array[i] + ' = \'' + reqbody[array[i]] + '\''
        }
        string +=',';
    }
    string = string.slice(0, -1);
    string += ' where ' + id + ' = ' + reqbody[id];
    return string;
}

function generateCreate(table, array, reqbody, isintarray){
    //'insert INTO elders (name, location) VALUES (\'' + req.body.name + '\',\'' + req.body.location + '\')'
    var string = 'insert into ' + table + '(';
    for(var i = 0; i < array.length; i++){
        string += array[i] + ','
    }
    string = string.slice(0, -1);
    string += ') VALUES (';
    for(i = 0; i < array.length; i++){
        if(reqbody[array[i]] == undefined || reqbody[array[i]] == ""){
            string += 'NULL, ';
            continue;
        }
        if(isintarray[i]){
            string += reqbody[array[i]]
        }else{
            string += '\'' + reqbody[array[i]] + '\''
        }
        string += ',';
    }
    string = string.slice(0, -1);
    string += ')';
    return string;

}

function generateRead(table){
    return 'select * from ' + table
}

function generateDelete(table, id){

}



