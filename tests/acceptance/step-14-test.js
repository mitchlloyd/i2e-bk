/*
  In this step you're going to write your own tests to add a feature that
  allows users to toggle between the current and remaining time of a song in
  the now-playing footer component.

  * The currentTime is the ellapsed time of the song. Your player service
    already exposes currentTime as a property.

  * The remainingTime is the duration of the song minus the currentTime

  Use the first test as an example of how to use moduleForComponent, then
  write your own test and implement this feature.
*/

import { test, moduleForComponent } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('now-playing', "Step 14: Toggle ellapsed/current time", { integration: true });

test("when a song is loaded and the player is not playing, the component shows the song name", function(assert) {
  this.set('player', Ember.Service.create());

  // Current bug with the resolver prevents using angle brackets
  this.render(hbs`
    {{now-playing player=player}}
  `);

  this.set('player.song', { name: 'Song name' });
  this.set('player.isPlaying', false);

  assert.equal(this.$('.play:contains(▶)').length, 1, "The component should contain a play button");
  assert.equal(this.$('.play:contains(❙❙)').length, 0, "The component should not contain a pause button");
  assert.equal(this.$('.now-playing-name').text().trim(), 'Song name', "The component shows the song name");
});

test("Toggling current and remaining time", function(assert) {
  this.set('player', Ember.Service.create());

  // Current bug with the resolver prevents using angle brackets
  this.render(hbs`
    {{now-playing player=player}}
  `);

  Ember.run(() => {
    this.set('player.song', { duration: 120 });
    this.set('player.currentTime', 30);
  });

  let durationElement = this.$('.duration');

  assert.equal(durationElement.text().trim(), '0:30', "The component should show the current time");
  durationElement.click();
  assert.equal(durationElement.text().trim(), '1:30', "The component should show the remaining time");
});
