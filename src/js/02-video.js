import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

player.on('timeupdate', throttle(saveCurrentTime, 1000));

function saveCurrentTime(e) {
  const currentTime = e.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
}

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
}
