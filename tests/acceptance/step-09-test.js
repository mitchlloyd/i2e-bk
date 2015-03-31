/*
  In this step you'll replace the markup for a song in an album with a
  component called song-row. This component will switch between a play and
  pause button depending on whether the song is playing or not.

  Note that the app has CSS that only shows the .play span when a user hovers
  over a song-row.

  When the song-row component is first rendered the play button should show.

  <td class="song-track">
    <span class="track-number">
      1
    </span>
    <span class="play">
      <span>▶</span>
    </span>
  </td>
  <td class="song-name">Song name</td>
  <td class="song-duration">5:23</td>

  Then when the play button is clicked the pause button should show.

  <td class="song-track">
    <span class="track-number">
      1
    </span>
    <span class="play">
      <span>❙❙</span>
    </span>
  </td>
  <td class="song-name">Song name</td>
  <td class="song-duration">5:23</td>

  When the pause button is clicked the play button should show again.

  There are a couple different ways this component could be implemented. To get the
  tests passing, you may need to move the "play" class in your markup so that the
  tests click on the exact element that handles the click event.
*/

import step from '../helpers/step';
import { test } from 'ember-qunit';

step("9", "Create a song-row component");

test("the component shows the play button by default", function(assert) {
  visit('album/1');

  andThen(function() {
    assert.equal(find('tr:first .play:contains(▶)').length, 1, "The play button is showing");
    assert.equal(find('tr:first .play:contains(❙❙)').length, 0, "The pause button is not showing");
  });
});

test("the component toggles betwen the pause and play button when it's clicked", function(assert) {
  assert.expect(4);
  visit('album/1');

  click('tr:first .play:contains(▶)');

  andThen(function() {
    assert.equal(find('tr:first .play:contains(❙❙)').length, 1, "The pause button is showing");
    assert.equal(find('tr:first .play:contains(▶)').length, 0, "The play button is not showing");
  });

  click('tr:first .play:contains(❙❙)');

  andThen(function() {
    assert.equal(find('tr:first .play:contains(▶)').length, 1, "The play button is showing");
    assert.equal(find('tr:first .play:contains(❙❙)').length, 0, "The pause button is not showing");
  });
});

