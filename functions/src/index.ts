import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import {healthCareService} from "./healthCareService";

const app = express();

app.use(cors({ origin: true }));

healthCareService(app);

// uncomment for local development
 app.listen(3001);

export const api = functions.https.onRequest(app);