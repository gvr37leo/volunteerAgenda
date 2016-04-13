var app = angular.module('app', []);

app.controller('ctrl',function($scope){
    $scope.name = "paul";
    $scope.transports = [];
    $scope.commas = function commas(items) {
        return items.join(",");
    };


    $.ajax({
        url:"/volunteerAgenda/resources/transports.json"
    }).done(function(res){
        $scope.transports = res.transports;
        $scope.$apply();
        console.log(res);
    });
});