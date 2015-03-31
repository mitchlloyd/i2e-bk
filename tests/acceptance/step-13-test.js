/*

  In this step we're going to add a play and pause button to the
  now-playing widget.

  The markup for these buttons will be the same as the buttons
  found in song-row, so we're going to extract another component
  from the song-row component to finish this step.

  Create a new component called `audio-control` that renders the
  following HTML when a song is playing:

    <span class="audio-control">
      <span {{action 'pause'}}>❙❙</span>
    </span>

  And this HTML when the song is paused:

    <span class="audio-control">
      <span {{action 'play'}}>▶</span>
    </span>

  Once we have have this component in the {{now-playing}} template, we'll

*/

import { test } from 'ember-qunit';
import step from '../helpers/step';
import lookup from '../helpers/lookup';
import { exists } from '../helpers/assertions';

let App;
let player;
step(13, "The audio-control component", {
  setup: function(app) {
    App = app;
    player = lookup(app, 'service:player');
  }
});

test("The now-playing component has a pause button when a song is playing", function(assert) {
  visit('/album/1');
  click('td.song-track:first .play:contains(▶)');

  andThen(function() {
    assert.ok(exists('.now-playing .play:contains(❙❙)'), "The now-playing component is showing the pause button");
  });
});

test("Clicking the pause button", function(assert) {
  visit('/album/1');
  click('td.song-track:first .play:contains(▶)');
  click('.now-playing .play:contains(❙❙)');

  andThen(function() {
    assert.ok(exists('.now-playing .play:contains(▶)'), "The now-playing component is showing the play button");
    assert.equal(player.get('isPlaying'), false, "The player service stopped playing");
  });
});

test("Resuming the current song", function(assert) {
  visit('/album/1');
  click('td.song-track:first .play:contains(▶)');
  click('.now-playing .play:contains(❙❙)');
  click('.now-playing .play:contains(▶)');

  andThen(function() {
    assert.equal(player.get('isPlaying'), true, "The player service is playing");
  });
});

