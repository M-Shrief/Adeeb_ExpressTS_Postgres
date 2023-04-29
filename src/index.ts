import App from './app';
// Routes
import PoetRoute from './routes/poet.route';
import PoemRoute from './routes/poem.route';
import chosenVerseRoute from './routes/chosenVerse.route';
import ProseRoute from './routes/prose.route';
import PartnerRoute from './routes/partner.route';

const app = new App([
  new PoetRoute(),
  new PoemRoute(),
  new chosenVerseRoute(),
  new ProseRoute(),
  new PartnerRoute(),
]);

app.listen();
