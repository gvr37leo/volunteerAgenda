var app = angular.module('app', []);

app.controller('ctrl',function($scope){
    $scope.elders = [];

    $scope.delete = function(index){
        $.ajax({
            type:"DELETE",
            url:"/api/elders",
            data:{
                elderid:$scope.elders[index].elderid
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
                elderid:$scope.elders[index].elderid,
                elderName:$scope.elders[index].elderName,
                address:$scope.elders[index].address,
                postcode:$scope.elders[index].postcode,
                mobile:$scope.elders[index].mobile,
                note:$scope.elders[index].note,
                movementAidid:$scope.elders[index].movementAidid
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
                "movementAidid":$scope.movementAidid,
                "elderName":$scope.elderName,
                "address":$scope.address,
                "postcode":$scope.postcode,
                "mobile":$scope.mobile,
                "note":$scope.note
            }
        }).done(function(res){
            console.log(res);
            $scope.movementAidid = "";
            $scope.elderName = "";
            $scope.address = "";
            $scope.postcode = "";
            $scope.mobile = "";
            $scope.note = "";
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