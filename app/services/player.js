import Ember from 'ember';
const { run, on } = Ember;

export default Ember.Service.extend({
  isPlaying: false,
  currentTime: 0,

  audioElement: null,
  song: null,

  setupAudioElement: on('init', function() {
    let el = document.createElement('audio');
    el.addEventListener('play', run.bind(this, 'didStartPlaying'));
    el.addEventListener('pause', run.bind(this, 'didPause'));
    el.addEventListener('timeupdate', run.bind(this, 'timeDidUpdate'));
    this.set('audioElement', el);
  }),

  play(song) {
    this.set('song', song);
    this.set('audioElement.src', song.get('url'));
    this.get('audioElement').play();
  },

  pause() {
    this.get('audioElement').pause();
  },

  resume() {
    this.get('audioElement').play();
  },

  didStartPlaying() {
    this.set('isPlaying', true);
  },

  didPause() {
    this.set('isPlaying', false);
  },

  timeDidUpdate() {
    let roundedTime = Math.floor(this.get('audioElement.currentTime'));
    this.set('currentTime', roundedTime);
  },

  willDestroy() {
    this.get('audioElement').pause();
    this.set('audioElement.src', '');
  }
});
