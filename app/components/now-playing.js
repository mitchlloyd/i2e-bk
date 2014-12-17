import Ember from 'ember';
const { inject, computed } = Ember;

export default Ember.Component.extend({
  player: inject.service(),
  song: computed.reads('player.song'),

  actions: {
    pause() {
      this.get('player').pause();
    },

    resume() {
      this.get('player').resume();
    }
  }
});
