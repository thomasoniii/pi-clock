/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    lessOptions: {
    paths: [
      'bower_components/bootstrap/less',
      'bower_components/font-awesome/less',
      'bower_components/colorbrewer'
    ]}
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
  app.import('bower_components/d3/d3.min.js');

  //app.import('bower_components/bootstrap/dist/css/bootstrap.min.css');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', { destDir : 'assets' });

  //app.import('bower_components/font-awesome/css/font-awesome.min.css');
  app.import('bower_components/font-awesome/css/font-awesome.css.map', { destDir : 'assets' });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.svg', { destDir : 'fonts' });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', { destDir : 'fonts' });
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', { destDir : 'fonts' });

  app.import('bower_components/colorbrewer/colorbrewer.js');

  return app.toTree();
};
