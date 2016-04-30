var requestCRUD = function(router,connection,jsonSql) {
    router.route('/requests')
        .post(function (req, res) {
            //deleteEmptyKeys(req.body);
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
            connection.query(sql.query, function (err, rows, fields) {
                if (err)res.send(false);
                else res.send(true);
            });
        })
        .get(function (req, res) {
            //'select requestid,elderid,volunteerid,location,DATE_FORMAT(time,\'%Y-%c-%d %T\') AS time  from requests'
            connection.query('select requestid,elderid,volunteerid,requestTypeid,location,DATE_FORMAT(time,\'%Y-%m-%d %T\') AS time,DATE_FORMAT(timeback,\'%Y-%c-%d %T\') AS timeback,retour,note from requests', function (err, rows, fields) {
                res.send(rows);
            });
        })
        .delete(function (req, res) {
            connection.query('delete from requests where requestid = ' + req.body.requestid, function (err, rows, fields) {
                if (err)res.send(false);
                else res.send(true);
            });
        })
        .put(function (req, res) {
            //deleteEmptyKeys(req.body);
            //for some reason 0 values get deleted
            var sql = jsonSql.build({
                type: 'update',
                table: 'requests',
                condition: {requestid: req.body.requestid},
                modifier: req.body
            });
            //var query = generateUpdate('requests',['elderid','volunteerid','requestTypeid','location','time','timeback','retour','note'],req.body,[true,true,true,false,false,false,true,false],'requestid');
            //console.log(query);
            //console.log(sql.query);
            connection.query(sql.query, function (err, rows, fields) {
                if (err)res.send(false);
                else res.send(true);
            });
        });
    };
module.exports = requestCRUD;