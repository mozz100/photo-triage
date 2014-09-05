'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
    $scope.currentPhoto = 0;

    $http.get('/photos.json').success(function(data) {
        $scope.photos = data;
    });

    $scope.getPhotoURL = function(num) {
        var n = num % $scope.photos.length;
        return '/h:' + 300 + '/' + $scope.photos[n].fname;
    };
}]);