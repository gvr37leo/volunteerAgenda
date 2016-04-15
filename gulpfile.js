var gulp = require("gulp");
var jade = require("jade");
var fs = require("fs");

var options = {
    pretty:true
};

gulp.task('watch', function(){
    gulp.watch('client/jade/*.jade', ['jade']);
    console.log("watching jade files");
});

gulp.task('jade', function(){
    var elders = jade.renderFile("client/jade/elders.jade", options);
    var requests = jade.renderFile("client/jade/requests.jade",options);
    var volunteers = jade.renderFile("client/jade/volunteers.jade",options);
    fs.writeFile("client/html/elders.html", elders);
    fs.writeFile("client/html/requests.html", requests);
    fs.writeFile("client/html/volunteers.html", volunteers);
    console.log('rendered jade files');
});

gulp.task('default', ['jade', 'watch']);