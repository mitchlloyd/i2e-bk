/*
  Up until now, you've been putting all of your HTML in the
  application template. However, as you just learned, creating
  an app that supports multiple pages requires at least one outlet.

  To get the tests for Step 4 passing, you'll need to make a few
  structural changes.

  1) Move all of the album-specific HTML out of the application
     template and into a new `index` template.
  2) Create a router `route` for `/album/:album_id` that renders a new `album`
     template. For now, just make sure that it contains a `div` with the
     `album-info` class.
  3) Now change your Ember.Route files in app/routes so that each template has
     the model that it needs.

  Remember that you can use `findProperty` to find the album
  with a given `id` (You can see emberjs.com/guides/enumerables
  for more information).
*/

import { test } from 'ember-qunit';
import { exists } from '../helpers/assertions';
import lookup from '../helpers/lookup';
import step from '../helpers/step';

let App;
step(3, "Add Router Route", {
  setup: function(app) {
    App = app;
  }
});

test("When navigating to /album/1, an album template is rendered", function(assert) {
  visit('/album/1');

  andThen(function() {
    assert.ok(exists('div.album-info'), "There should be a <div> with class 'album-info'");
  });
});

test("When navigating to /album/1, the album with ID of 1 is the model on the route", function(assert) {
  visit('/album/1');

  andThen(function() {
    let albumRoute = lookup(App, 'route:album');
    assert.ok(albumRoute.get('currentModel'), "The album route has a model");
    assert.equal(albumRoute.get('currentModel').id, 1, "The album's ID is 1");
  });
});

