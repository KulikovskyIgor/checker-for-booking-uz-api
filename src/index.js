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

app.post('/trains', function (req, res) {	
	fetch(`${config.host}/train_search/`,
		{
			method: 'POST',
			body: toFormData(req.body),
		})
		.then(res => res.json())
		.then(data => res.send(data))
		.catch(e => res.status(400).json({ error: e.message }));
});

app.server.listen(process.env.PORT || config.port, () => {
	console.log(`Started on port ${app.server.address().port}`);
});

export default app;
