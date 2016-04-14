var app = angular.module('app', []);

app.controller('ctrl',function($scope){
    $scope.transports = [];
    $scope.commas = function commas(items) {
        return items.join(",");
    };


    $.ajax({
        type:"GET",
        url:"/api/volunteer"
    }).done(function(res){
        $scope.transports = res.transports;
        $scope.$apply();
        console.log(res);
    });
});