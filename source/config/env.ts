import path from "path";
import { Dialect } from "sequelize";

const envOpt = {
	path: path.join(__dirname + "../../../", ".env"),
};
require("dotenv").config(envOpt);

/**
 * CONFIGURATION VALUES
 */
export const ENV_CONFIG = {
	PORT: parseInt(process.env.PORT as string),
	JWT_KEY: process.env.JWT_KEY as string,
};

export const DB_CONFIG = {
	NAME: process.env.DB_NAME as string,
	HOST: process.env.DB_HOST as string,
	PORT: parseInt(process.env.DB_PORT as string),
	USER: process.env.DB_USER as string,
	PASS: process.env.DB_PASS as string,
	TYPE: process.env.DB_TYPE as Dialect,
};
