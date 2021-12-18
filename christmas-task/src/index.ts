import './global.scss';
import Start from './pages/start/start';
import Card from './components/card/card';
import data from '../src/data.json';

new Start();

const a = new Card();
a.render();