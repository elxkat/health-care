import * as functions from 'firebase-functions';
import * as express from 'express';
import {healthCareService} from "./healthCareService";

const app = express();

healthCareService(app);

// uncomment for local development
// app.listen(3000);

export const api = functions.https.onRequest(app);