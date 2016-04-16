var app = angular.module('app', []);

app.controller('ctrl',function($scope){
    $scope.volunteers = [];


    $scope.delete = function(index){
        $.ajax({
            type:"DELETE",
            url:"/api/volunteers",
            data:{
                volunteerid:$scope.volunteers[index].volunteerid
            }
        }).done(function(res){
            console.log(res);
            $scope.get();
        });
    };
    $scope.update = function(index){
        $.ajax({
            type:"PUT",
            url:"/api/volunteers",
            data:{
                name:$scope.volunteers[index].name,
                volunteerid:$scope.volunteers[index].volunteerid
            }
        }).done(function(res){
            console.log(res);
            $scope.get();
        });
    };
    $scope.post = function(){
        $.ajax({
            type:"POST",
            url:"/api/volunteers",
            data:{
                "name":$scope.name
            }
        }).done(function(res){
            console.log(res);
            $scope.name = "";
            $scope.get();
        });
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