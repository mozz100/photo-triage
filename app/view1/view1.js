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
    $scope.photos = [];

    $http.get('/photos.json').success(function(data) {
        $scope.photos = data;
    });

    $scope.getPhotoURL = function(num) {
        if ($scope.photos.length > 0) {
            var n = num % $scope.photos.length;
            return '/h:' + 300 + '/' + $scope.photos[n].fname;            
        }
    };

    $scope.movePhoto = function(delta) {
        var newPhoto = ($scope.currentPhoto + delta) % $scope.photos.length;
        while (newPhoto < 0) {
            newPhoto += $scope.photos.length;
        }
        $scope.currentPhoto = newPhoto;
    };
}]);