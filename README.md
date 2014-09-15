photo-triage
============

Quickly rate a folder full of photos, discard unwanted shots.

```
cd photos/some_folder
triage                      # starts a webserver on port 8123

# Open web browser on computer, smart phone or tablet, use arrow and 
# number keys or swipes and clicks to rate photos.
# Back in the terminal, Ctrl+C to save and end.

cat ratings.json            # see ratings

triage --less-than 2        # list the chaff

triage --less-than 2 remove # separate the wheat.
                            # NB deletes .RAW or .CR2 files (in fact 
                            # anything with same name as the jpg)
```

Command line parameters
=======================

```
-p PORT                    Choose port other than 8123
--photos-dir               Choose photo directory other than pwd
--reset                    Start with all photos rated zero
--less-than RATING         Output list of all photos with rating 
                           less than that specified
--less-than RATING remove  Remove photos with rating less than RATING.
                           Also removes all files matching the photo's name.
--cache-dir DIR            Override the default location for the reduced-size JPGs
                           served to browsers (default is /Volumes/Storage/tmp/triage)

```

Tests
=====

```
npm install
npm test                   # or npm test-single-run
npm run update-webdriver
npm start &                # in the background
npm run protractor         # requires java runtime
```
