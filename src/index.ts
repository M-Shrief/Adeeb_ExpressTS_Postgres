import App from './app';
// Routes
import PoetRoute from './routes/poet.route';
import PoemRoute from './routes/poem.route';
const app = new App([new PoetRoute(), new PoemRoute()]);

app.listen();
