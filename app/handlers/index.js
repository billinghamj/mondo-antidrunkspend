import Router from 'express-promise-router';

const router = Router();
export default router;

router.post('/mondo-webhook', async (req, res) => {
	if (req.app.get('limit-enabled')) {
		res.sendStatus(204);
		return;
	}

	console.log(req.body);
	res.sendStatus(204);
});

router.get('/change-settings', async (req, res) => {
	const enabled = !!req.query.enabled;
	const amount = parseInt(req.query.amount, 10);

	req.app.set('limit-enabled', enabled);
	req.app.set('limit-amount', amount);

	res.sendStatus(204);
});

router.get('/view-settings', async (req, res) => {
	const enabled = req.app.get('limit-enabled');
	const amount = req.app.get('limit-amount');

	res.json({ enabled, amount });
});
