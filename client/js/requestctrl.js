var app = angular.module('app', ["ui.bootstrap"]);

app.controller('ctrl',function($scope){
    //rows
    $scope.requests = [];
    $scope.volunteers = [];
    $scope.elders = [];

    //dictionary's
    $scope.volunteersbyid = {};
    $scope.eldersbyid = {};
    $scope.volunteersbyname = {};
    $scope.eldersbyname = {};

    //array version of dictionary for typeahead fields with only the name value
    $scope.uniqueElders = [];
    $scope.uniqueVolunteers = [];

    $.ajax({
        type:"GET",
        url:"/api/volunteers"
    }).done(function(res){
        res.forEach(function(volunteer, i){
            $scope.uniqueVolunteers[i] = volunteer.volunteerName;
            $scope.volunteersbyid[volunteer.volunteerid] = volunteer;
            $scope.volunteersbyname[volunteer.volunteerName] = volunteer;
        });
        console.log(res);
    });
    $.ajax({
        type:"GET",
        url:"/api/elders"
    }).done(function(res){
        res.forEach(function(elder, i){
            $scope.uniqueElders[i] = elder.elderName;
            $scope.eldersbyid[elder.elderid] = elder;
            $scope.eldersbyname[elder.elderName] = elder;
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
                requestid:$scope.requests[index].requestid,
                elderid:$scope.eldersbyname[$scope.elders[index]].elderid,
                volunteerid:$scope.volunteersbyname[$scope.volunteers[index]].volunteerid,
                location:$scope.requests[index].location,
                requestTypeid:$scope.requests[index].requestTypeid,
                time:$scope.requests[index].time,
                timeback:$scope.requests[index].timeback,
                retour:$scope.requests[index].retour,
                note:$scope.requests[index].note

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
                "elderid":$scope.eldersbyname[$scope.elderName].elderid,
                "volunteerid":$scope.volunteersbyname[$scope.volunteerName].volunteerid,
                "requestTypeid":$scope.requestTypeid,
                "location":$scope.location,
                "time":$scope.time,
                "timeback":$scope.timeback,
                "retour":$scope.retour,
                "note":$scope.note
            }
        }).done(function(res){
            console.log(res);
            $scope.elderid = "";
            $scope.volunteerid = "";
            $scope.requestTypeid = "";
            $scope.location = "";
            $scope.time = "";
            $scope.timeback = "";
            $scope.retour = 0;
            $scope.note = "";
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
                $scope.volunteers[i] = $scope.volunteersbyid[request.volunteerid].volunteerName;
                $scope.elders[i] = $scope.eldersbyid[request.elderid].elderName
            });
            $scope.$apply();
            console.log(res);
        });
    };
    $scope.get();
});

app.directive('typeahead', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        template: '<input class="form-control" type="text">',
        link: function(scope, elem, attrs){
            elem.typeahead({
                source:scope[attrs.source],
                minLength:0,
                showHintOnFocus:true,
                autoSelect:false
            });
        }
    };
});

app.directive('datetimepicker', function() {
    return {
        restrict: 'AE',
        replace: 'true',
        template: '<input class="form-control" type="text">',
        link: function(scope, elem, attrs, model){
            elem.datetimepicker({
                format:"YYYY-MM-DD HH:mm",
                widgetPositioning:{
                    horizontal: 'auto',
                    vertical: 'bottom'
                }
            });
            elem.on("dp.change", function(e){
                scope[attrs.model] = e.date.format("YYYY-MM-DD HH:mm");
                scope.$apply();//this line could be commented out since datetimepicker itself already applies the correct value to the input value
            });
        }
    };
});