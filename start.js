import JsonClient from 'json-client';
import App from './app';

const port = process.env.PORT || 3000;
const mondo = process.env.MONDO_API || 'https://staging-api.getmondo.co.uk';

App.set('limit-enabled', false);
App.set('limit-amount', 0);

App.set('mondo', JsonClient(mondo));

App.listen(port);
