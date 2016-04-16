export default function (error, req, res, next) { // jshint unused:false
	res.status(500);
	res.text(error.stack);
}
