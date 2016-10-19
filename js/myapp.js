var myApp = angular.module('myApp',[]);

myApp.controller('generateController', function ($scope, $http, $interval) {
    $scope.apiUrl = 'http://topgeoitsockets.azurewebsites.net/api/passphrasegen';
    $scope.bits = 50;
    $scope.binary = "";
    $scope.sentence = "";

    $scope.genEnthropy = function () {

        $http({
            method: 'GET',
            url: $scope.apiUrl + 'bits' + '?bits=' + $("#enthropy_input").val(),
            data: {
                bits: $scope.bits
            }
        })
            .success(function (data, status) {
                if (data.error == null) {
                    console.log(data);
                    //$("#texter")[0].innerHTML = data;
                    $scope.sentence = data.substring(0, data.length-1);
                    $scope.result = data;
                } else {
                    alert("Error " + data.error);
                }
            })
            .error(function (data, status) {
                alert("Error");
            });
    };
    $scope.genBinary = function () {

        $http({
            method: 'POST',
            url: $scope.apiUrl + 'binary',
            data: "\"" + $scope.binary + "\""
            
        })
            .success(function (data, status) {
                if (data.error == null) {
                    console.log(data);
                    //$("#texter")[0].innerHTML = data;
                    $scope.sentence = data.substring(0, data.length-1);
                    $scope.result = data;
                } else {
                    alert("Error " + data.error);
                }
            })
            .error(function (data, status) {
                alert("Error");
            });
    };
    $scope.genSentence = function () {

        $http({
            method: 'POST',
            url: $scope.apiUrl + 'sentence',
            data: "\"" + $scope.sentence + "\""
        })
            .success(function (data, status) {
                if (data.error == null) {
                    console.log(data);
                    //$("#texter")[0].innerHTML = data;
                    $scope.binary = data;
                    $scope.result = data;
                } else {
                    alert("Error " + data.error);
                }
            })
            .error(function (data, status) {
                alert("Error");
            });
    };

    
});