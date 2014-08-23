photo-triage
============

Quickly rate a folder full of photos, discard unwanted shots

```
cd photos/some_folder
triage                      # starts a webserver on port 8123
# Open web browser, use arrow and number keys/swipes to rate photos, x to end
cat ratings.json            # see ratings
triage --less-than 2        # list the chaff
triage --less-than 2 remove # separate the wheat.  NB deletes .RAW or .CR2 files (in fact anything with same name as the jpg)
```

