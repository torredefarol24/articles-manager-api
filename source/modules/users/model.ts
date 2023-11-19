import { DataTypes, NOW } from "sequelize";
import { DB, DB_TABLES } from "../../config/db";
import { USER_TYPES } from "../../config/enums";

export const UserTable = DB.define(
	DB_TABLES.Users,
	{
		userId: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: NOW,
		},
		type: {
			type: DataTypes.ENUM,
			values: [USER_TYPES.ADMIN, USER_TYPES.CONTENT_CREATOR],
			defaultValue: USER_TYPES.CONTENT_CREATOR,
		},
	},
	{
		timestamps: false,
	}
);
