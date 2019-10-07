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

    // Retrieve photo info and ratings from the server.
    $http.get('/photos.json').success(function(data) {
        $scope.photos = data;
    });

    // Function to get the photo URL for a given index
    $scope.getPhotoURL = function(num) {
        if ($scope.photos.length > 0) {
            var n = num % $scope.photos.length;
            return '/h:' + 800 + '/' + $scope.photos[n].fname;
        }
    };

    // Function to get the rating of the current photo
    $scope.currentRating = function() {
        return $scope.photos[$scope.currentPhoto].rating;
    };

    // Return an array of (unique) space-separated CSS classes
    // for building the glyphicon stars
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

    // Function to set rating of current photo.
    // If called with rating equal to that of current photo, set rating to zero.
    $scope.rate = function(rating) {
        var newRating = 0;
        if (rating != $scope.currentRating()) {
            newRating = rating;
        }
        
        // POST rating back to the server.
        var data = { index: $scope.currentPhoto, rating: newRating };
        $http.post('/rate', data).success(function() {
            $scope.photos[$scope.currentPhoto].rating = newRating;
        });
    };

    // Function to reset all ratings via http POST.
    // On success, reset ratings in the scope, too.
    $scope.resetAllRatings = function() {
        $http.post('/rate/reset', {}).success(function() {
            // set all ratings to zero
            for(var p = 0; p < $scope.photos.length; p++) {
                $scope.photos[p].rating = 0;
            }
        });
    };

    // Make HTTP POST to /save.  We've been rating photos as we go.
    // This tells the server to write to the file.
    $scope.save = function() {
        $http.post('/save', {}).success(function(data) {
        });
    };

    // Make HTTP POST to /quit.
    // This tells the server to shut down.
    $scope.killServer = function(skipConfirm) {
        if (skipConfirm || confirm("Quit?")) {
            $http.post('/quit', {}).success(function() {
                alert("Bye bye")
            });
        }
    }

    // Move <delta> photos through the array, wrapping back
    // around at zero/end-of-array
    $scope.movePhoto = function(delta) {
        var newPhoto = ($scope.currentPhoto + delta) % $scope.photos.length;
        while (newPhoto < 0) {
            newPhoto += $scope.photos.length;
        }
        $scope.currentPhoto = newPhoto;
    };
}]);
