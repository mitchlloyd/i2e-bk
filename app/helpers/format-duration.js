import Ember from 'ember';

export default Ember.Helper.helper(function([duration]) {
  let minutes = Math.floor(duration / 60);
  let seconds = duration % 60;
  let formattedSeconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${minutes}:${formattedSeconds}`;
});
