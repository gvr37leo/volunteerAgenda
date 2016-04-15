var app = angular.module('app', []);

app.controller('ctrl',function($scope){
    $scope.requests = [];
    $scope.commas = function commas(items) {
        return items.join(",");
    };


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
});