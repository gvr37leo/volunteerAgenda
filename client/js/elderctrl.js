var app = angular.module('app', []);

app.controller('ctrl',function($scope){
    $scope.elders = [];
    $scope.commas = function commas(items) {
        return items.join(",");
    };
    $scope.delete = function(index){
        $.ajax({
            type:"DELETE",
            url:"/api/elders",
            data:{
                id:$scope.elders[index].elderid
            }
        }).done(function(res){
            console.log(res);
            $scope.get();
        });
    };
    $scope.update = function(index){
        $.ajax({
            type:"PUT",
            url:"/api/elders",
            data:{
                name:$scope.elders[index].name,
                location:$scope.elders[index].location,
                id:$scope.elders[index].elderid
            }
        }).done(function(res){
            console.log(res);
            $scope.get();
        });
    };
    $scope.post = function(){
        $.ajax({
            type:"POST",
            url:"/api/elders",
            data:{
                "name":$scope.name,
                "location":$scope.location
            }
        }).done(function(res){
            console.log(res);
            $scope.name = "";
            $scope.location = "";
            $scope.get();
        });
    };
    $scope.get = function(){
        $.ajax({
            type:"GET",
            url:"/api/elders"
        }).done(function(res){
            $scope.elders = res;
            $scope.$apply();
            console.log(res);
        });
    };
    $scope.get();

});