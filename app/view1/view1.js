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

    $scope.currentRating = function() {
        return $scope.photos[$scope.currentPhoto].rating;
    };

    $scope.getStars = function() {
        if ($scope.photos.length > 0) {
            var stars = [];
            for (var s=0; s<3; s++) {
                if (s < $scope.currentRating()) {
                    stars.push("star star"+s);  // duplicates not allowed in a repeater
                } else {
                    stars.push("star-empty star"+s);
                }
            }
            return stars;
        }
    };

    $scope.rate = function(rating) {
        var newRating = 0;
        if (rating != $scope.currentRating()) {
            newRating = rating;
        }
        var data = { index: $scope.currentPhoto, rating: newRating };
        $http.post('/rate', data).success(function() {
            $scope.photos[$scope.currentPhoto].rating = newRating;
        });
    };

    $scope.resetAllRatings = function() {
        $http.post('/rate/reset', {}).success(function() {
            // set all ratings to zero
            for(var p = 0; p < $scope.photos.length; p++) {
                $scope.photos[p].rating = 0;
            }
        });
    };

    $scope.movePhoto = function(delta) {
        var newPhoto = ($scope.currentPhoto + delta) % $scope.photos.length;
        while (newPhoto < 0) {
            newPhoto += $scope.photos.length;
        }
        $scope.currentPhoto = newPhoto;
    };
}]);