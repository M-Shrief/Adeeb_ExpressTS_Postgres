import App from './app';
// Routes
import PoetRoute from './routes/poet.route';
import PoemRoute from './routes/poem.route';
import chosenVerseRoute from './routes/chosenVerse.route';

const app = new App([new PoetRoute(), new PoemRoute(), new chosenVerseRoute()]);

app.listen();
