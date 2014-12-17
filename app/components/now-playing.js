import Ember from 'ember';
const { inject, computed } = Ember;

export default Ember.Component.extend({
  player: inject.service(),
  song: computed.reads('player.song'),
  showCurrentTime: true,

  remainingTime: computed('song.duration', 'player.currentTime', function() {
    return this.get('song.duration') - this.get('player.currentTime');
  }),

  actions: {
    pause() {
      this.get('player').pause();
    },

    resume() {
      this.get('player').resume();
    },

    toggleTimeDisplay: function() {
      this.toggleProperty('showCurrentTime');
    }
  }
});
