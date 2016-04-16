import Router from 'express-promise-router';

const router = Router();
export default router;

router.post('/mondo-webhook', async (req, res) => {
	const mondo = req.app.get('mondo');
	const enabled = req.app.get('limit-enabled');
	const amount = req.app.get('limit-amount');

	if (!enabled) {
		res.sendStatus(204);
		return;
	}

	if (req.body.type !== 'transaction.created') {
		res.sendStatus(204);
		return;
	}

	const account_id = req.body.data.account_id;

	const balance = await mondo('get', 'balance', { account_id });

	if (Math.abs(balance.spend_today) < amount) {
		res.sendStatus(204);
		return;
	}

	const cards = await mondo('get', 'card/list', { account_id });

	for (const card of cards) {
		await mondo('put', 'card/toggle', null, {
			card_id: card.id,
			status: 'INACTIVE',
		});
	}

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
