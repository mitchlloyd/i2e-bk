import DS from 'ember-data';
import Ember from 'ember';
const { Model, attr, hasMany } = DS;
const { computed } = Ember;

export default Model.extend({
  artwork: attr('string'),
  name: attr('string'),
  artist: attr('string'),
  isExplicit: attr('boolean'),
  songs: hasMany('song'),

  songDurations: computed.mapBy('songs', 'duration'),
  totalDuration: computed.sum('songDurations'),
  songCount: computed.reads('songs.length')
});
