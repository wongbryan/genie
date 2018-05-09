const express = require('express')
const bodyParser = require('body-parser')
const { spawn } = require('child_process')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/* cross origin */
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.post('/api', async (req, res) => {
	const child = spawn('python3', ['/Users/bryanwong/Desktop/dev/genie/dummy.py']);
	child.on('exit', (code, signal) => {
		console.log('child process exited with exit code ' + code + '.');
		const status = code ? 200 : 400;
		const payload = {
			status: status,
		};
		res.status(status).send(payload);
	});
})

app.listen(3000);