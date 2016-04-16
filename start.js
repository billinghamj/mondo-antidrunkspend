import JsonClient from 'json-client';
import App from './app';

const port = process.env.PORT || 3000;
const base = process.env.MONDO_API || 'https://staging-api.getmondo.co.uk';
const token = process.env.MONDO_TOKEN;

App.set('limit-enabled', false);
App.set('limit-amount', 0);

App.set('mondo', JsonClient(base, {
	headers: { Authorization: `Bearer ${token}` },
}));

App.listen(port);
