import Ember from 'ember';
import albums from 'bumbox/models/album-fixtures';

export default Ember.Route.extend({
  model() {
    return albums;
  }
});
