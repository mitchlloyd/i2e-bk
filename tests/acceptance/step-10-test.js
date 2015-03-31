/*
  In this step you'll create a player service to play songs in the browser.
  Your mute key will become your friend :)

  For this step and others it may be helpful to learn about the HTML audio
  element API:

  https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio

  Rather than rendering an audio tag for each song on the page, this service
  will use one audio element that it creates when it is initialized. You can
  create an audio element in JavaScript with

    document.createElement('audio');

  There is no requirement to insert the element into the DOM.

  Get the first 4 tests passing by creating a `player` service. Let the tests
  be your guide here.

  On the 5th test, you'll need to begin interacting with song row. Don't
  forget that you can access the service from the component using the
  Ember.inject.service() function.

  Once all of your tests are passing it's time for a little manual testing.
  Use the audio tag API to enhance your `player#play()` and `player#pause()`
  methods so that you can hear the songs play and pause.

  Finally, if we want to make sure our `isPlaying` state is always in sync with
  our audioElement (in case of an error or latency for instance) we can setup
  handlers for the audioElement's `play` and `pause` events. Using Ember.run we
  will be important here so that Ember knows there are pending asynchronous
  callbacks.

  When you're finished with this step you'll likely have a few subtle bugs
  with the behavior of your pause and play buttons, but we'll clean those up
  soon.
*/

import Ember from 'ember';
import { test } from 'qunit';
import { propertyShouldBecome } from '../helpers/assertions';
import lookup from '../helpers/lookup';
import step from '../helpers/step';

let player;

step("10", "Create player service", {
  setup: function(app) {
    player = lookup(app, 'service:player');
  }
});

test("Should have a player service", function(assert) {
  assert.ok(player instanceof Ember.Service, "Player service is defined");
});

test("Eventually isPlaying changes when the song is played", function(assert) {
  assert.expect(1);
  let song = Ember.Object.create({url: 'audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3'});

  propertyShouldBecome(player, 'isPlaying', true, assert.async());
  player.play(song);
});

test("The song stops playing when the service is destroyed", function(assert) {
  let song = Ember.Object.create({url: 'audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3'});

  player.play(song);
  Ember.run(player, player.destroy);

  assert.ok(player.get('audioElement').paused, 'The audio element is paused');
  assert.equal(player.get('audioElement').src, document.baseURI, 'The audio element src has been wiped');
});

test("Eventually isPlaying becomes false when the song is paused", function(assert) {
  let song = Ember.Object.create({url: 'audio/Southern_Nights_-_07_-_All_My_Sorrows.mp3'});

  propertyShouldBecome(player, 'isPlaying', true, assert.async());
  player.play(song);

  propertyShouldBecome(player, 'isPlaying', false, assert.async());
  player.pause();
});

test("Clicking a song-row play button plays a song", function(assert) {
  visit('album/1');
  click('.song-track .play:first:contains(▶)');

  andThen(function() {
    assert.equal(player.get('isPlaying'), true, "The player started playing");
  });
});

test("Clicking the song-row pause button pauses the player", function(assert) {
  visit('album/1');
  click('.song-track .play:first:contains(▶)');

  andThen(function() {
    assert.equal(player.get('isPlaying'), true, "the player started playing");
  });

  click('.song-track .play:first:contains(❙❙)');

  andThen(function() {
    assert.equal(player.get('isPlaying'), false, "the player stopped playing");
  });
});

