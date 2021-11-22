// eslint-disable-next-line import/no-unresolved
import '@/styles/style.scss';
import Settings from './components/settings';

window.addEventListener('load', function () {
  const volumeRewind = document.querySelector('.volume');
  const volumeCheck = document.querySelector('.volume-check');
  const timeRewind = document.querySelector('.time');
  const timeCheck = document.querySelector('.time-check');
  volumeRewind.value = localStorage.getItem('volume');
  volumeCheck.checked = localStorage.getItem('volumeChecked');
  timeRewind.value = localStorage.getItem('time');
  timeCheck.checked = localStorage.getItem('timeChecked');
  console.log(timeRewind.value, timeCheck.checked)
});
new Settings();
