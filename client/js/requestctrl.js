var app = angular.module('app', []);

app.controller('ctrl',function($scope){
    $scope.requests = [];
    $scope.volunteers = {};
    $scope.elders = {};
    $scope.volunteersbyname = {};
    $scope.eldersbyname = {};

    $.ajax({
        type:"GET",
        url:"/api/volunteers"
    }).done(function(res){
        res.forEach(function(volunteer){
            $scope.volunteers[volunteer.volunteerid] = volunteer;
            $scope.volunteersbyname[volunteer.name] = volunteer;
        });
        console.log(res);
    });
    $.ajax({
        type:"GET",
        url:"/api/elders"
    }).done(function(res){
        res.forEach(function(elder){
            $scope.elders[elder.elderid] = elder;
            $scope.eldersbyname[elder.name] = elder;
        });
        console.log(res);
    });

    $scope.delete = function(index){
        $.ajax({
            type:"DELETE",
            url:"/api/requests",
            data:{
                requestid:$scope.requests[index].requestid
            }
        }).done(function(res){
            console.log(res);
            $scope.get();
        });
    };
    $scope.update = function(index){
        $.ajax({
            type:"PUT",
            url:"/api/requests",
            data:{
                elderid:$scope.requests[index].elderid,
                volunteerid:$scope.requests[index].volunteerid,
                location:$scope.requests[index].location,
                time:$scope.requests[index].time,
                requestid:$scope.requests[index].requestid
            }
        }).done(function(res){
            console.log(res);
            $scope.get();
        });
    };
    $scope.post = function(){
        $.ajax({
            type:"POST",
            url:"/api/requests",
            data:{
                "elderid":$scope.elderid,
                "volunteerid":$scope.volunteerid,
                "time":$scope.time,
                "location":$scope.location
            }
        }).done(function(res){
            console.log(res);
            $scope.elderid = "";
            $scope.volunteerid = "";
            $scope.time = "";
            $scope.location = "";
            $scope.get();
        });
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
    $scope.get();
});

$("#elderid").typeahead({
    hint: true,
    highlight: true,
    minLength: 1
},{
    name:"elders",
    source:["aap","ananas"]
});