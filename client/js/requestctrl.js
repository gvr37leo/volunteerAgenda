var app = angular.module('app', ["ui.bootstrap"]);

//dictionary's
var volunteersbyid = {};
var eldersbyid = {};
var volunteersbyname = {};
var eldersbyname = {};
var requestTypesbyid = {};
var requestTypesbyname = {};

app.controller('ctrl',function($scope){
    //rows
    $scope.requests = [];

    //array version of dictionary for typeahead fields with only the name value
    $scope.uniqueElders = [];
    $scope.uniqueVolunteers = [];
    $scope.uniqueRequestTypes = [];

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
    $.ajax({
        type:"GET",
        url:"/api/requesttype"
    }).done(function(res){
        res.forEach(function(requesttype, i){
            //building dictionary
            $scope.uniqueRequestTypes[i] = requesttype.requestName;
            requestTypesbyid[requesttype.requestTypeid] = requesttype;
            requestTypesbyname[requesttype.requestName] = requesttype;
        });
        console.log(res);
    });
//----------------------------------------------------------------------------
    $scope.post = function(){
        $.ajax({
            type:"POST",
            url:"/api/requests",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify({
                "elderid":eldersbyname[$scope.elderName].elderid,
                "volunteerid":volunteersbyname[$scope.volunteerName].volunteerid,
                "requestTypeid":requestTypesbyname[$scope.requestName].requestTypeid,
                "location":$scope.location,
                "time":$scope.time,
                "timeback":$scope.timeback,
                "retour":$scope.retour,
                "note":$scope.note
            })
        }).done(function(res){
            console.log(res);
            $scope.elderName = "";
            $scope.volunteerName = "";
            $scope.requestName = "";
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
                request.requestName = requestTypesbyid[request.requestTypeid].requestName;
                //delete because the id isn't gonna get updated and would contain wrong data if the user changes the name
                //id will get looked up in the dictionary with the correct name when updates occur
                delete request.volunteerid;
                delete request.elderid;
                delete request.requestTypeid;
            });
            $scope.$apply();
            console.log(res);
        });
    };
    $scope.update = function(request){
        $.ajax({
            type:"PUT",
            url:"/api/requests",
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data:JSON.stringify({
                requestid:request.requestid,
                //dictionary lookup of the correct id
                elderid:eldersbyname[request.elderName].elderid,
                volunteerid:volunteersbyname[request.volunteerName].volunteerid,
                requestTypeid:requestTypesbyname[request.requestName].requestTypeid,

                location:request.location,
                time:request.time,
                timeback:request.timeback,
                retour:request.retour,
                note:request.note
            })
        }).done(function(res){
            console.log(res);
            $scope.get();
        });
    };
    $scope.delete = function(request){
        $.ajax({
            type:"DELETE",
            url:"/api/requests",
            data:{
                requestid:request.requestid
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
                useCurrent:false,
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