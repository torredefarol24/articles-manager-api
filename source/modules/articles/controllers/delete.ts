import { NextFunction, Response } from "express";
import { ERRORS, USER_TYPES } from "../../../config/enums";
import { ArticlesTable } from "../model";

export async function deleteArticle(request: any, response: Response, next: NextFunction) {
	try {
		const article: any = await ArticlesTable.findOne({
			where: {
				articleId: request.params.articleId,
			},
		});

		if (!article) {
			next(new Error(ERRORS.ARTICLE_NOT_FOUND));
		}

		if (article && request.user.type === USER_TYPES.CONTENT_CREATOR) {
			if (article.ownerId !== request.user.userId) {
				next(new Error(ERRORS.ARTICLE_NOT_YOURS));
			}
		}

		const rowCount = await ArticlesTable.destroy({
			where: {
				articleId: request.params.articleId,
			},
		});

		rowCount === 1
			? next({
					code: 200,
					message: "Article Deleted",
					data: {},
			  })
			: next(new Error(ERRORS.ARTICLE_NOT_FOUND));
	} catch (err) {
		next(err);
	}
}
