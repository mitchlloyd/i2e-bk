import Ember from 'ember';
const { inject } = Ember;

export default Ember.Component.extend({
  isPlaying: false,

  player: inject.service(),

  actions: {
    play() {
      this.get('player').play(this.get('attrs.song'));
      this.set('isPlaying', true);
    },

    pause() {
      this.get('player').pause();
      this.set('isPlaying', false);
    }
  }
});
