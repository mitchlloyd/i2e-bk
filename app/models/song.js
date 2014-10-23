import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  track: attr('number'),
  name: attr('string'),
  duration: attr('number'),
  url: attr('string'),
  album: belongsTo('album')
});
