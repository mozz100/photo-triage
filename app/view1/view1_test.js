'use strict';

describe('myApp.view1 module', function() {
  var scope, view1Ctrl, $httpBackend;

  beforeEach(module('myApp.view1'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.whenPOST('/rate').respond({});
    $httpBackend.whenPOST('/quit').respond({});
    $httpBackend.whenPOST('/rate/reset').respond({});
    $httpBackend.expectGET('/photos.json').
          respond([
            {"fname":"IMAG0001.jpg","rating":0},
            {"fname":"IMAG0002.jpg","rating":0}
          ]);
    scope = $rootScope.$new();
    view1Ctrl = $controller('View1Ctrl', {$scope: scope});
  }));

  describe('view1 controller', function(){

    it('should be defined', function() {
      expect(view1Ctrl).toBeDefined();
    });

    it('should load photos via xhr', function() {
      expect(scope.photos).toEqual([]);
      $httpBackend.flush();
      expect(scope.photos.length).toEqual(2);
    });

    it('should start up with photo 0', function () {
      expect(scope.currentPhoto).toBe(0);
    });

    // tests for scope.getPhotoURL
    it('should return correct urls for photos', function() {
      $httpBackend.flush();
      expect(scope.getPhotoURL(0)).toEqual('/h:800/IMAG0001.jpg');
      expect(scope.getPhotoURL(1)).toEqual('/h:800/IMAG0002.jpg');

      // check modulo arithmetic works
      expect(scope.getPhotoURL(2)).toEqual('/h:800/IMAG0001.jpg');
    });

    // tests for scope.movePhoto
    it('should move between photos correctly', function() {
      $httpBackend.flush();
      expect(scope.photos.length).toEqual(2);
      expect(scope.currentPhoto).toEqual(0);

      scope.movePhoto(+1);
      expect(scope.currentPhoto).toEqual(1);

      scope.movePhoto(+1);
      expect(scope.currentPhoto).toEqual(0);  // wraps round the end
      
      scope.movePhoto(-1);
      expect(scope.currentPhoto).toEqual(1);  // wraps round zero
      
      scope.movePhoto(-1);
      expect(scope.currentPhoto).toEqual(0);

    });

    // test for scope.killServer
    it('should submit to /quit correctly', function() {
      $httpBackend.flush();

      scope.killServer(true);
      $httpBackend.flush();
    });

    // tests for getStars, rate and currentRating
    it('should get star ratings correctly', function() {
      $httpBackend.flush();
      expect(scope.currentRating()).toEqual(0);
      expect(scope.getStars()).toEqual(['star-empty star0','star-empty star1','star-empty star2']);
      
      scope.rate(1);
      $httpBackend.flush();
      expect(scope.currentRating()).toEqual(1);
      expect(scope.getStars()).toEqual(['star star0','star-empty star1','star-empty star2']);

      scope.rate(3);
      $httpBackend.flush();
      expect(scope.currentRating()).toEqual(3);
      expect(scope.getStars()).toEqual(['star star0','star star1','star star2']);

      scope.rate(3);  // repeating the rating resets it to zero
      $httpBackend.flush();
      expect(scope.currentRating()).toEqual(0);
      expect(scope.getStars()).toEqual(['star-empty star0','star-empty star1','star-empty star2']);

      scope.rate(2);
      $httpBackend.flush();
      expect(scope.currentRating()).toEqual(2);

      scope.movePhoto(+1);
      expect(scope.currentRating()).toEqual(0);

      scope.movePhoto(-1);
      expect(scope.currentRating()).toEqual(2);

    });

  });
});