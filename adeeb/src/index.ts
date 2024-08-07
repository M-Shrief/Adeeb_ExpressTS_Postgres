import 'reflect-metadata';
import App from './app';
// Databases
import { connectDB } from './db';
// Routes
import { PoetRoute } from './components/poet/poet.route';
import { PoemRoute } from './components/poem/poem.route';
import { ChosenVerseRoute } from './components/chosenVerse/chosenVerse.route';
import { ProseRoute } from './components/prose/prose.route';
import { PartnerRoute } from './components/partner/partner.route';
import { OrderRoute } from './components/order/order.route';

connectDB();

const app = new App([
  PoetRoute,
  PoemRoute,
  ChosenVerseRoute,
  ProseRoute,
  PartnerRoute,
  OrderRoute,
]);

app.listen();
