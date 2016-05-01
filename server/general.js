var jsonSql = require('json-sql')({
    separatedValues:false,
    namedValues:false,
    //wrappedIdentifiers:false,
    dialect:"mysql"
});

var genCRUD = function(router,connection,tableName,idfield){
    router.route('/' + tableName)
        .post(function (req, res) {
            var sql = jsonSql.build({
                type: 'insert',
                table: tableName,
                values: req.body
            });
            connection.query(sql.query, function(err, rows, fields) {
                if(err)res.send(false);
                else res.send(true);
            });
        })
        .get(function(req, res){
            connection.query('select * from ' + tableName, function(err, rows, fields){
                res.send(rows);
            });
        })
        .delete(function(req, res){
            connection.query('delete from ' + tableName + ' where ' + idfield + ' = ' + req.body[idfield], function(err, rows, fields){
                if(err)res.send(false);
                else res.send(true);
            });
        })
        .put(function(req, res){
            var condition = {};
            condition[idfield] = req.body[idfield];
            var sql = jsonSql.build({
                type: 'update',
                table: tableName,
                condition:condition,
                modifier: req.body
            });
            console.log(sql.query);
            connection.query(sql.query, function(err, rows, fields){
                if(err)res.send(false);
                else res.send(true);
            });
        });
};


module.exports = genCRUD;