var app = angular.module('app', ['mgcrea.ngStrap',"ui.bootstrap"]);

app.controller('ctrl',function($scope){
    $scope.volunteers = [];
    $scope.mon = 0;
    $scope.tue = 0;
    $scope.wed = 0;
    $scope.thu = 0;
    $scope.fri = 0;
    $scope.sat = 0;
    $scope.sun = 0;

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
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify({
                volunteerid:$scope.volunteers[index].volunteerid,
                volunteerName:$scope.volunteers[index].volunteerName,
                mon:$scope.volunteers[index].mon,
                tue:$scope.volunteers[index].tue,
                wed:$scope.volunteers[index].wed,
                thu:$scope.volunteers[index].thu,
                fri:$scope.volunteers[index].fri,
                sat:$scope.volunteers[index].sat,
                sun:$scope.volunteers[index].sun
            })
        }).done(function(res){
            console.log(res);
            $scope.get();
        });
    };
    $scope.post = function(){
        $.ajax({
            type:"POST",
            url:"/api/volunteers",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify({
                "volunteerName":$scope.volunteerName,
                "mon":$scope.mon,
                "tue":$scope.tue,
                "wed":$scope.wed,
                "thu":$scope.thu,
                "fri":$scope.fri,
                "sat":$scope.sat,
                "sun":$scope.sun
            })
        }).done(function(res){
            console.log(res);
            $scope.volunteerName = "";
            $scope.mon = 0;
            $scope.tue = 0;
            $scope.wed = 0;
            $scope.thu = 0;
            $scope.fri = 0;
            $scope.sat = 0;
            $scope.sun = 0;
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