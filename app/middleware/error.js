export default function (error, req, res, next) { // jshint unused:false
	res.status(500);
	res.type('text/plain');
	res.send(error.stack);
	console.error(error.stack);
}
