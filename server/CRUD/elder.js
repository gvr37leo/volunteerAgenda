var elderCRUD = function(router,connection,jsonSql){
    router.route('/elders')
        .post(function (req, res) {
            //deleteEmptyKeys(req.body);
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
            //deleteEmptyKeys(req.body);
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
};


module.exports = elderCRUD;