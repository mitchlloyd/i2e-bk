import DS from 'ember-data';
import Ember from 'ember';
const { Model, attr, belongsTo } = DS;
const { computed } = Ember;

export default Model.extend({
  track: attr('number'),
  name: attr('string'),
  duration: attr('number'),
  url: attr('string'),
  album: belongsTo('album'),

  artist: computed.reads('album.artist'),
  artwork: computed.reads('album.artwork')
});
