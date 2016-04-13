var gulp = require("gulp");
var jade = require("jade");
var fs = require("fs");

var options = {
    pretty:true
};

gulp.task('watch', function(){
    gulp.watch('jade/*.jade', ['jade']);
    console.log("watching jade files");
});

gulp.task('jade', function(){
    var cpc = jade.renderFile("jade/cpc.jade", options);
    var index = jade.renderFile("jade/index.jade",options);
    fs.writeFile("index.html", index);
    fs.writeFile("cpc.html", cpc);
    console.log('rendered jade files');
});

gulp.task('default', ['jade', 'watch']);