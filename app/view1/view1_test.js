'use strict';

describe('myApp.view1 module', function() {
  var scope, view1Ctrl, $httpBackend;

  beforeEach(module('myApp.view1'));

  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
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
      expect(scope.photos).toBeUndefined();
      $httpBackend.flush();
      expect(scope.photos.length).toEqual(2);
    });

    it('should start up with photo 0', function () {
      expect(scope.currentPhoto).toBe(0);
    });

    // TODO tests for scope.getPhotoURL
    it('should return correct urls for photos', function() {
      $httpBackend.flush();
      expect(scope.getPhotoURL(0)).toEqual('/h:300/IMAG0001.jpg');
      expect(scope.getPhotoURL(1)).toEqual('/h:300/IMAG0002.jpg');

      // check modulo arithmetic works
      expect(scope.getPhotoURL(2)).toEqual('/h:300/IMAG0001.jpg');
    });

  });
});