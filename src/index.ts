import App from './app';
// Database
import './db';
// Routes
import { PoetRoute } from './components/poet/poet.route';
import { PoemRoute } from './components/poem/poem.route';
import { ChosenVerseRoute } from './components/chosenVerse/chosenVerse.route';
import { ProseRoute } from './components/prose/prose.route';
// import { PartnerRoute } from './components/partner/partner.route';
// import { OrderRoute } from './components/order/order.route';

const app = new App([
  new PoetRoute(),
  new PoemRoute(),
  new ChosenVerseRoute(),
  new ProseRoute(),
  // new PartnerRoute(),
  // new OrderRoute(),
]);

export default app.listen();
