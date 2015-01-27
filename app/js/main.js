 require.config({
    paths: {
      "knockout": "../vendor/knockout",
      "underscore": "../vendor/underscore"
    }
  });

  require(['app'], function(App) {
    return console.log("app started");
  });