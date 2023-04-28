import App from './app';
import ExampleRoute from './routes/example.route';

const app = new App([new ExampleRoute()]);

app.listen();
