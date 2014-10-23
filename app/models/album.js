import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default Model.extend({
  artwork: attr('string'),
  name: attr('string'),
  artist: attr('string'),
  isExplicit: attr('boolean'),
  songs: hasMany('song')
});
