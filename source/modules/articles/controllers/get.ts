import { NextFunction, Response } from "express";
import { Op } from "sequelize";
import { ARTICLE_STATUS, USER_TYPES } from "../../../config/enums";
import { UserTable } from "../../users/model";
import { ArticlesTable } from "../model";

function getFilter(user: any) {
	const adminFilter = {
		attributes: ["articleId", "content", "title", "status", "createdAt"],
		include: [
			{
				model: UserTable,
				attributes: ["userId", "username", "type"],
			},
		],
	};

	const contentCreatorFilter = {
		attributes: ["articleId", "content", "title", "createdAt"],
		where: {
			[Op.or]: [{ status: ARTICLE_STATUS.PUBLISHED }, { ownerId: user.userId }],
		},
		include: [
			{
				model: UserTable,
				attributes: ["userId", "username"],
			},
		],
	};

	return user.type === USER_TYPES.ADMIN ? adminFilter : contentCreatorFilter;
}

export async function getAll(request: any, response: Response, next: NextFunction) {
	try {
		const articles = await ArticlesTable.findAll(getFilter(request.user));
		next({
			code: 200,
			message: "Articles Fetched",
			data: {
				articles,
			},
		});
	} catch (err) {
		next(err);
	}
}
