var app = angular.module('app', []);

app.controller('ctrl',function($scope){
    $scope.volunteers = [];
    $scope.commas = function commas(items) {
        return items.join(",");
    };


    $scope.get = function(){
        $.ajax({
            type:"GET",
            url:"/api/volunteers"
        }).done(function(res){
            $scope.volunteers = res;
            $scope.$apply();
            console.log(res);
        });
    };

    $scope.get();
});