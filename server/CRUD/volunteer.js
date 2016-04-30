var volunteerCRUD = function(router,connection,jsonSql) {
    router.route('/volunteers')
        .post(function (req, res) {
            //deleteEmptyKeys(req.body);
            var sql = jsonSql.build({
                type: 'insert',
                table: 'volunteers',
                //fields: for optional null value injection
                values: req.body
            });
            //var query = generateCreate('volunteers',['volunteerName','mon','tue','wed','thu','fri','sat','sun'],req.body,[false,true,true,true,true,true,true,true]);
            //console.log(query);
            //console.log(sql.query);
            connection.query(sql.query, function (err, rows, fields) {
                if (err)res.send(false);
                else res.send(true);
            });
        })
        .get(function (req, res) {
            connection.query('select * from volunteers', function (err, rows, fields) {
                res.send(rows);
            });
        })
        .delete(function (req, res) {
            connection.query('delete from volunteers where volunteerid =' + req.body.volunteerid, function (err, rows, fields) {
                if (err)res.send(false);
                else res.send(true);
            });
        })
        .put(function (req, res) {
            //deleteEmptyKeys(req.body);
            //0 values ignored
            var sql = jsonSql.build({
                type: 'update',
                table: 'volunteers',
                condition: {volunteerid: req.body.volunteerid},
                modifier: req.body
            });
            //var query = generateUpdate('volunteers',['volunteerName','mon','tue','wed','thu','fri','sat','sun'],req.body,[false,true,true,true,true,true,true,true],'volunteerid');
            //console.log(query);
            //console.log(sql.query);
            connection.query(sql.query, function (err, rows, fields) {
                if (err)res.send(false);
                else res.send(true);
            });
        });
    };
module.exports = volunteerCRUD