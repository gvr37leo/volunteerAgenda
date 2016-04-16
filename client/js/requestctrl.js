var app = angular.module('app', []);

app.controller('ctrl',function($scope){
    $scope.requests = [];
    $scope.volunteers = [];
    $scope.elders = [];

    $scope.volunteersbyid = {};
    $scope.eldersbyid = {};
    $scope.volunteersbyname = {};
    $scope.eldersbyname = {};

    $.ajax({
        type:"GET",
        url:"/api/volunteers"
    }).done(function(res){
        $("#volunteerid").typeahead({
            source:res,
            minLength:0,
            showHintOnFocus:true,
            autoSelect:false,
            updater:function(item){
                $scope.volunteerid = item.name;
                $scope.$apply();
                return item.name;
            },
            displayText:function(item){
                return item.name;
            }
        });
        res.forEach(function(volunteer, i){
            //$scope.volunteers[i] = volunteer.name;
            $scope.volunteersbyid[volunteer.volunteerid] = volunteer;
            $scope.volunteersbyname[volunteer.name] = volunteer;
        });
        console.log(res);
    });
    $.ajax({
        type:"GET",
        url:"/api/elders"
    }).done(function(res){
        $("#elderid").typeahead({
            source:res,
            minLength:0,
            showHintOnFocus:true,
            autoSelect:false,
            updater:function(item){
                $scope.elderid = item.name;
                $scope.$apply();
                return item.name;
            },
            displayText:function(item){
                return item.name;
            }
        });
        res.forEach(function(elder, i){
            //$scope.elders[i] = elder.name;
            $scope.eldersbyid[elder.elderid] = elder;
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
                elderid:$scope.eldersbyname[$scope.elders[index]].elderid,
                volunteerid:$scope.volunteersbyname[$scope.volunteers[index]].volunteerid,
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
                "elderid":$scope.eldersbyname[$scope.elderid].elderid,
                "volunteerid":$scope.volunteersbyname[$scope.volunteerid].volunteerid,
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
            res.forEach(function(request, i){
                $scope.volunteers[i] = $scope.volunteersbyid[request.volunteerid].name;
                $scope.elders[i] = $scope.eldersbyid[request.elderid].name
            });
            $scope.$apply();
            console.log(res);
        });
    };
    $scope.get();

    var inpTime = $("#inpTime");
    inpTime.datetimepicker({
        format:"YYYY-MM-DD HH:mm",
        widgetPositioning:{
            horizontal: 'auto',
            vertical: 'bottom'
        }
    });
    inpTime.on("dp.change", function(e){
        $scope.time = e.date.format("YYYY-MM-DD HH:mm");
        $scope.$apply();
    });
});



