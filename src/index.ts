import 'reflect-metadata';
import { container } from 'tsyringe';
import App from './app';
// Databases
import { connectDB } from './db';
import { connectRedis } from './redis';
// Routes
import { PoetRoute } from './components/poet/poet.route';
import { PoemRoute } from './components/poem/poem.route';
import { ChosenVerseRoute } from './components/chosenVerse/chosenVerse.route';
import { ProseRoute } from './components/prose/prose.route';
import { PartnerRoute } from './components/partner/partner.route';
import { OrderRoute } from './components/order/order.route';

connectDB();
connectRedis();

const app = new App([
  PoetRoute,
  PoemRoute,
  new ChosenVerseRoute(),
  new ProseRoute(),
  new PartnerRoute(),
  new OrderRoute(),
]);

export default app.listen();
