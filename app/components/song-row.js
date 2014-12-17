import Ember from 'ember';
const { inject, computed } = Ember;

export default Ember.Component.extend({
  player: inject.service(),

  actions: {
    play() {
      this.get('player').play(this.get('attrs.song'));
    },

    pause() {
      this.get('player').pause();
    }
  },

  isCurrentSong: computed('player.song', 'attrs.song', function() {
    return this.get('player.song') === this.get('attrs.song');
  }),

  isPlaying: computed('isCurrentSong', 'player.isPlaying', function() {
    return this.get('isCurrentSong') && this.get('player.isPlaying');
  })
});
