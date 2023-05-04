import App from './app';
// Routes
import PoetRoute from './components/poet/poet.route';
import PoemRoute from './components/poem/poem.route';
import chosenVerseRoute from './components/chosenVerse/chosenVerse.route';
import ProseRoute from './components/prose/prose.route';
import PartnerRoute from './components/partner/partner.route';
import OrderRoute from './components/order/order.route';

const app = new App([
  new PoetRoute(),
  new PoemRoute(),
  new chosenVerseRoute(),
  new ProseRoute(),
  new PartnerRoute(),
  new OrderRoute(),
]);

app.listen();
