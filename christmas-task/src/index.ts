import './global.scss';
import Start from './pages/start/start';
import RenderCards from './components/renderCards/renderCards';
import DragToys from './components/dragToys/dragToys';

new Start();

const a = new RenderCards();
a.render();
new DragToys();