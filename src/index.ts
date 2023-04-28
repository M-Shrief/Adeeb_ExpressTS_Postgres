import App from './app';
// Routes
import PoetRoute from './routes/poet.route';
const app = new App([new PoetRoute()]);

app.listen();
