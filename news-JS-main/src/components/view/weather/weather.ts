import './weather.css';
class Weather {

  temperature: HTMLElement;

  weatherDescription: HTMLElement;

  city: HTMLInputElement;

  wind: HTMLElement;

  humidity: HTMLElement;

  constructor() {
    this.temperature = document.querySelector('.temperature') as HTMLElement;
    this.weatherDescription = document.querySelector('.weather-description') as HTMLElement;
    this.city = document.querySelector('.city') as HTMLInputElement;
    this.wind = document.querySelector('.wind') as HTMLElement;
    this.humidity = document.querySelector('.humidity') as HTMLElement;
    this.city.addEventListener('change', this.getWeather.bind(this));
  }

  async getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city.value}&lang=en&appid=94e79d036c9efc29c9a2c590a84d4fdc&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    this.city.placeholder = 'Enter your city';
    try {
      this.temperature.textContent = `${Math.ceil(data.main.temp)}°C`;
      this.weatherDescription.textContent = data.weather[0].description;
      this.wind.textContent = `Wind ${Math.ceil(data.wind.speed)} m/c`;
      this.humidity.textContent = `humidity ${Math.ceil(data.main.humidity)} %`;
    } catch (err) {
      if (this.city.value == '') {
        this.temperature.textContent = 'Error! Nothing to geocode';
        this.weatherDescription.textContent = '';
        this.wind.textContent = ' ';
        this.humidity.textContent = '';
      } else {
        this.temperature.textContent = `Error: city not found for: ${this.city.value}`;
        this.weatherDescription.textContent = '';
        this.wind.textContent = ' ';
        this.humidity.textContent = '';
      }
    }
  }
}

export default Weather;




