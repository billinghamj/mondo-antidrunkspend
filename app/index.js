import express from 'express';
import * as middleware from './middleware';
import handlers from './handlers';

const app = express();
export default app;

app.use(express.static(__dirname + '/../public'))
app.use(middleware.types);
app.use(middleware.body);
app.use(handlers);
app.use(middleware.notFound);
app.use(middleware.error);
