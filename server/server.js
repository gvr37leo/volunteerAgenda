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

router.route('/elders')
    .post(function (req, res) {
        deleteEmptyKeys(req.body);
        var sql = jsonSql.build({
            type: 'insert',
            table: 'elders',
            //fields: for optional null value injection
            values: req.body
        });
        //console.log(sql.query);
        //var query = generateCreate('elders',['movementAidid','elderName','address','postcode','mobile','note'],req.body,[true,false,false,false,false,false]);
        //console.log(query);
        connection.query(sql.query, function(err, rows, fields) {
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
        deleteEmptyKeys(req.body);
        var sql = jsonSql.build({
            type: 'update',
            table: 'elders',
            condition:{elderid:req.body.elderid},
            modifier: req.body
        });
        //console.log(sql.query);
        //'update elders set name = \'' + req.body.name + '\', location=\'' + req.body.location + '\' where elderid =' + req.body.elderid
        //var query = generateUpdate('elders',['movementAidid','elderName','address','postcode','mobile','note'],req.body,[true,false,false,false,false,false],'elderid');
        //console.log(query);
        connection.query(sql.query, function(err, rows, fields){
            if(err)res.send(false);
            else res.send(true);
        });
    });

router.route('/volunteers')
    .post(function (req, res) {
        deleteEmptyKeys(req.body);
        var sql = jsonSql.build({
            type: 'insert',
            table: 'volunteers',
            //fields: for optional null value injection
            values: req.body
        });
        //var query = generateCreate('volunteers',['volunteerName','mon','tue','wed','thu','fri','sat','sun'],req.body,[false,true,true,true,true,true,true,true]);
        //console.log(query);
        //console.log(sql.query);
        connection.query(sql.query, function(err, rows, fields) {
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
        deleteEmptyKeys(req.body);
        var sql = jsonSql.build({
            type: 'update',
            table: 'volunteers',
            condition:{volunteerid:req.body.volunteerid},
            modifier: req.body
        });
        //var query = generateUpdate('volunteers',['volunteerName','mon','tue','wed','thu','fri','sat','sun'],req.body,[false,true,true,true,true,true,true,true],'volunteerid');
        //console.log(query);
        //console.log(sql.query);
        connection.query(sql.query, function(err, rows, fields){
            if(err)res.send(false);
            else res.send(true);
        });
    });

router.route('/requests')
    .post(function (req, res) {
        deleteEmptyKeys(req.body);
        var sql = jsonSql.build({
            type: 'insert',
            table: 'requests',
            //fields: for optional null value injection
            values: req.body
        });
        //'insert INTO requests (elderid, volunteerid, location, time) VALUES (' + req.body.elderid + ',' + req.body.volunteerid + ',\'' + req.body.location + '\',\'' + req.body.time + '\')'
        //var query = generateCreate('requests',['elderid','volunteerid','requestTypeid','location','time','timeback','retour','note'],req.body,[true,true,true,false,false,false,true,false]);
        //
        //console.log(query);
        //console.log(sql.query);
        connection.query(sql.query, function(err, rows, fields) {
            if(err)res.send(false);
            else res.send(true);
        });
    })
    .get(function(req, res){
        //'select requestid,elderid,volunteerid,location,DATE_FORMAT(time,\'%Y-%c-%d %T\') AS time  from requests'
        connection.query('select requestid,elderid,volunteerid,requestTypeid,location,DATE_FORMAT(time,\'%Y-%m-%d %T\') AS time,DATE_FORMAT(timeback,\'%Y-%c-%d %T\') AS timeback,retour,note from requests', function(err, rows, fields){
            res.send(rows);
        });
    })
    .delete(function(req, res){
        connection.query('delete from requests where requestid = ' + req.body.requestid, function(err, rows, fields){
            if(err)res.send(false);
            else res.send(true);
        });
    })
    .put(function(req, res){
        //deleteEmptyKeys(req.body);
        //for some reason 0 values get deleted
        var sql = jsonSql.build({
            type: 'update',
            table: 'requests',
            condition:{requestid:req.body.requestid},
            modifier: req.body
        });
        //var query = generateUpdate('requests',['elderid','volunteerid','requestTypeid','location','time','timeback','retour','note'],req.body,[true,true,true,false,false,false,true,false],'requestid');
        //console.log(query);
        console.log(sql.query);
        connection.query(sql.query, function(err, rows, fields){
            if(err)res.send(false);
            else res.send(true);
        });
    });

app.get('*', function(req, res){
    res.sendFile('client/html/404.html', { root : "./"});
});

//looks like mysql has something that converts json objects to sql queries

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



