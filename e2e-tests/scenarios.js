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
      expect(element(by.css('.caption')).isDisplayed()).toEqual(true);
    });

    it('should render the first photo at /', function() {
      expect(element(by.css('.photo')).isDisplayed()).toEqual(true);
      expect(element(by.css('.caption')).getText()).toEqual('Photo 1 of 2');
    });

  });


});
