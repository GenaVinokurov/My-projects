import App from './components/app/app';
import Weather from './components/view/weather/weather';
import './global.css';
const app = new App();
app.start();
const weather = new Weather();
weather.getWeather();
