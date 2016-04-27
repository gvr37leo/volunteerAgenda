var app = angular.module('app', ["ui.bootstrap"]);

//dictionary's
var volunteersbyid = {};
var eldersbyid = {};
var volunteersbyname = {};
var eldersbyname = {};

app.controller('ctrl',function($scope){
    //rows
    $scope.requests = [];

    //array version of dictionary for typeahead fields with only the name value
    $scope.uniqueElders = [];
    $scope.uniqueVolunteers = [];

    $.ajax({
        type:"GET",
        url:"/api/volunteers"
    }).done(function(res){
        res.forEach(function(volunteer, i){
            //building dictionary
            $scope.uniqueVolunteers[i] = volunteer.volunteerName;
            volunteersbyid[volunteer.volunteerid] = volunteer;
            volunteersbyname[volunteer.volunteerName] = volunteer;
        });
        console.log(res);
    });
    $.ajax({
        type:"GET",
        url:"/api/elders"
    }).done(function(res){
        res.forEach(function(elder, i){
            //building dictionary
            $scope.uniqueElders[i] = elder.elderName;
            eldersbyid[elder.elderid] = elder;
            eldersbyname[elder.elderName] = elder;
        });
        console.log(res);
    });
//----------------------------------------------------------------------------
    $scope.post = function(){
        $.ajax({
            type:"POST",
            url:"/api/requests",
            data:{
                "elderid":eldersbyname[$scope.elderName].elderid,
                "volunteerid":volunteersbyname[$scope.volunteerName].volunteerid,
                "requestTypeid":$scope.requestTypeid,
                "location":$scope.location,
                "time":$scope.time,
                "timeback":$scope.timeback,
                "retour":$scope.retour,
                "note":$scope.note
            }
        }).done(function(res){
            console.log(res);
            $scope.elderName = "";
            $scope.volunteerName = "";
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
            res.forEach(function(request){
                request.volunteerName = volunteersbyid[request.volunteerid].volunteerName;
                request.elderName = eldersbyid[request.elderid].elderName;
                //delete because the id isn't gonna get updated and would contain wrong data if the user changes the name
                //id will get looked up in the dictionary with the correct name when updates occur
                delete request.volunteerid;
                delete request.elderid;
            });
            $scope.$apply();
            console.log(res);
        });
    };
    $scope.update = function(index){
        $.ajax({
            type:"PUT",
            url:"/api/requests",
            data:{
                requestid:$scope.requests[index].requestid,
                //dictionary lookup of the correct id
                elderid:eldersbyname[$scope.requests[index].elderName].elderid,
                volunteerid:volunteersbyname[$scope.requests[index].volunteerName].volunteerid,

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
        scope:{
            model:"="
        },
        link: function(scope, elem, attrs){
            elem.datetimepicker({
                format:"YYYY-MM-DD HH:mm",
                widgetPositioning:{
                    horizontal: 'auto',
                    vertical: 'bottom'
                }
            });
            elem.on("dp.change", function(e){
                scope.model = e.date.format("YYYY-MM-DD HH:mm");
                scope.$apply();//this line could be commented out since datetimepicker itself already applies the correct value to the input value
            });
        }
    };
});