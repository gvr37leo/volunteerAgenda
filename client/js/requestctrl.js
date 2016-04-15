var app = angular.module('app', []);

app.controller('ctrl',function($scope){
    $scope.requests = [];
    $scope.volunteers = [];
    $scope.elders = [];
    $.ajax({
        type:"GET",
        url:"/api/volunteers"
    }).done(function(res){
        $scope.volunteers = res;
        $scope.$apply();
        console.log(res);
    });
    $.ajax({
        type:"GET",
        url:"/api/elders"
    }).done(function(res){
        $scope.elders = res;
        $scope.$apply();
        console.log(res);
    });

    $scope.get = function(){
        $.ajax({
            type:"GET",
            url:"/api/requests"
        }).done(function(res){
            $scope.requests = res;
            $scope.$apply();
            console.log(res);
        });
    };
    $scope.get();
});