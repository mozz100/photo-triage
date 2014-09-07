'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

/* Note: this runs against the app, for real, as it were - as started by 'npm start'.
   It uses the photos in sample-photos (see package.json).
*/

describe('my app', function() {

  browser.get('index.html');

  it('should automatically redirect to / when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('view1', function() {

    beforeEach(function() {
      browser.get('index.html#/');
    });


    it('should render view1 when user navigates to /', function() {
      expect(element(by.css('.caption .info')).isDisplayed()).toEqual(true);
    });

    it('should render the first photo at /', function() {
      expect(element(by.css('.photo')).isDisplayed()).toEqual(true);
      expect(element(by.css('.caption .info')).getText()).toEqual('Photo 1 of 2');
    });

    // tests for next/prev
    it('should step next/prev', function() {
      element(by.css('.next')).click();
      expect(element(by.css('.caption .info')).getText()).toEqual('Photo 2 of 2');

      element(by.css('.next')).click();
      expect(element(by.css('.caption .info')).getText()).toEqual('Photo 1 of 2');

      element(by.css('.prev')).click();
      expect(element(by.css('.caption .info')).getText()).toEqual('Photo 2 of 2');

      element(by.css('.prev')).click();
      expect(element(by.css('.caption .info')).getText()).toEqual('Photo 1 of 2');
    });

    // tests for star clicks
    it('should rate photos', function() {
      expect(element.all(by.css('.glyphicon-star-empty')).count()).toEqual(3);
      
      element(by.css('.star1')).click();  // equivalent to rating 2
      expect(element.all(by.css('.glyphicon-star')).count()).toEqual(2);
      expect(element.all(by.css('.glyphicon-star-empty')).count()).toEqual(1);

      element(by.css('.next')).click();
      expect(element.all(by.css('.glyphicon-star-empty')).count()).toEqual(3);

      element(by.css('.star2')).click();  // equivalent to rating 3
      expect(element.all(by.css('.glyphicon-star')).count()).toEqual(3);
      expect(element.all(by.css('.glyphicon-star-empty')).count()).toEqual(0);

      element(by.css('.prev')).click();
      expect(element.all(by.css('.glyphicon-star')).count()).toEqual(2);
      expect(element.all(by.css('.glyphicon-star-empty')).count()).toEqual(1);

    });

  });


});
