import {Express, Request, Response} from "express";
import {ProvidersQueryParams} from "./interfaces";
import { Pool  } from 'pg';
import {queryBuilder} from "./impl";

const pool = new Pool({
  user: 'aizakuoidgxxrd',
  host: 'ec2-54-217-208-105.eu-west-1.compute.amazonaws.com',
  database: 'd1fb2eavapm9v8',
  password: 'd5ff35255e171ca22b1f8ed3faad998ac16d61e6e7f23ab5c616b2639f35a372',
  port: 5432,
  ssl: true
});

export function healthCareService(app: Express) {

  app.get("/providers", async (req: Request, res: Response) => {
    const queryParams = req.query as ProvidersQueryParams;

    try {
      const query = queryBuilder(queryParams);
      const queryRes = await pool.query(query);
      res.json(queryRes.rows);
    } catch(err) {
      console.log("Exception on healthCareService", queryParams, err);
      throw err;
    }
  });
}