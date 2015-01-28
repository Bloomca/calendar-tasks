# Calendar tasks
Test app with knockout &amp;&amp; gulp.
You can add infinite number of notes to each day and they are persistent between sessions. Navigation by months is available, though app doesn't have router, so hash navigation doesn't work.
This app is deployed at [github pages](http://bloomca.github.io/calendar-tasks/).

## Problems
1. tests have to be added
1. this app has not pixel-perfect layout (photoshop isn't available for me right now)
2. some obvious things aren't present (like infinite height of tooltip without scroll)
3. app design have some problems (some functions aren't optimised)
4. app throws error due to several knockout's applying to the same element (I can't find why does this appear exactly; I guess it has some problems with creating layout inside existing knockout bindings)
5. sass file has to be separated into several modules