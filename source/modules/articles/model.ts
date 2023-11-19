import { DataTypes, NOW } from "sequelize";
import { DB, DB_TABLES } from "../../config/db";
import { ARTICLE_STATUS } from "../../config/enums";
import { UserTable } from "../users/model";

export const ArticlesTable = DB.define(DB_TABLES.Articles, {
	articleId: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.ENUM,
		values: [ARTICLE_STATUS.PENDING, ARTICLE_STATUS.PUBLISHED, ARTICLE_STATUS.REJECTED],
		defaultValue: ARTICLE_STATUS.PENDING,
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: NOW,
	},
	updatedAt: {
		type: DataTypes.DATE,
	},
	ownerId: {
		type: DataTypes.INTEGER,
	},
});

UserTable.hasMany(ArticlesTable, { foreignKey: "articleId" });
ArticlesTable.belongsTo(UserTable, { foreignKey: "ownerId" });
