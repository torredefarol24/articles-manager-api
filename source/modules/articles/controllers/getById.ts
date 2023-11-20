import { NextFunction, Response } from "express";
import { Op } from "sequelize";
import { ARTICLE_STATUS, ERRORS, USER_TYPES } from "../../../config/enums";
import { UserTable } from "../../users/model";
import { ArticlesTable } from "../model";

function getFilter(user: any, articleId: number) {
	const adminFilter = {
		attributes: ["articleId", "content", "title", "status", "createdAt"],
		where: {
			articleId,
		},
		include: [
			{
				model: UserTable,
				attributes: ["userId", "username", "type"],
			},
		],
	};

	const contentCreatorFilter = {
		attributes: ["articleId", "content", "title", "status", "createdAt"],
		where: {
			[Op.or]: [{ status: ARTICLE_STATUS.PUBLISHED }, { ownerId: user.userId }],
			[Op.and]: [{ articleId: articleId }],
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

export async function getArticleById(request: any, response: Response, next: NextFunction) {
	try {
		const article = await ArticlesTable.findOne(getFilter(request.user, request.params.articleId));
		if (!article) {
			next(new Error(ERRORS.ARTICLE_UNDER_REVIEW));
		}

		next({
			code: 200,
			message: "Article Fetched",
			data: {
				article,
			},
		});
	} catch (err) {
		next(err);
	}
}
