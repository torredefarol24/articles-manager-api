import { Sequelize } from "sequelize";
import { DB_CONFIG } from "./env";

export const DB = new Sequelize(DB_CONFIG.NAME, DB_CONFIG.USER, DB_CONFIG.PASS, {
	host: DB_CONFIG.HOST,
	dialect: DB_CONFIG.TYPE,
});

export const DB_TABLES = {
	Articles: "articles",
	Users: "users",
};
