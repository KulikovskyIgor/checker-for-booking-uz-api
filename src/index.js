import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config.json';
import fetch from "node-fetch";

import { toFormData } from "./lib/utils";

let app = express();
app.server = http.createServer(app);

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("Welcome checker-for-booking-uz-api");
});

app.get('/test', function(req, res) {	
	console.log("---0");
	
	fetch(`${config.host}/train_search/`,
		{
			method: 'POST',
		})
		.then(res => {
			console.log("---1", res)
			return res;
		})
		.then(res => {
			console.log("---2", res)
			return res.json();
		})
		.then(data => {
			console.log("---3", data);
			res.send(data)
		})
		.catch(e => {
			console.log("---4", e);
			res.status(400).json({ error: e.message });
		});
});

app.post('/trains', function (req, res) {	
	fetch(`${config.host}/train_search/`,
		{
			method: 'POST',
			body: toFormData(req.body),
			headers: { 
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Host': 'booking.uz.gov.ua',
				'Origin': 'https://booking.uz.gov.ua',
				'X-Requested-With': 'XMLHttpRequest',
			},
		})
		.then(res => res.json())
		.then(data => res.send(data))
		.catch(e => res.status(400).json({ error: e.message }));
});

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
