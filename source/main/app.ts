import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { DB } from "../config/db";
import { ENV_CONFIG } from "../config/env";
import { articleRoutes } from "../modules/articles/route";
import { userRoutes } from "../modules/users/route";
import { handleResponse } from "../utils/handleResponse";

export class ArticlesManager {
	public api: express.Application;

	constructor() {
		this.api = express();
		this.connectToDB();
		this.integrateMiddleware(this.api);
		this.integrateRoutes(this.api);
		this.runScheduledTask();
		this.listen();
	}

	private integrateMiddleware(app: express.Application) {
		app.use(cors());
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: true }));
	}

	private listen() {
		try {
			this.api.listen(ENV_CONFIG.PORT);
			console.log(`Listening on: ${ENV_CONFIG.PORT}`);
		} catch (err: any) {
			console.error(`Failed to start: ${err}`);
		}
	}

	private integrateRoutes(app: express.Application) {
		const apiVersion = "/api/v1";
		const routes = [userRoutes, articleRoutes];
		routes.map((route: any) => {
			app.use(`${apiVersion}/${route.entityName}`, route.router);
		});
		app.use(handleResponse);
	}

	private async connectToDB() {
		try {
			await DB.authenticate();
			console.log("Database Connection established");
			// await DB.sync();
			// console.log("Database Tables synced");
		} catch (err: any) {
			console.log("Database Connection failed", err);
		}
	}

	private runScheduledTask(){

	}
}
