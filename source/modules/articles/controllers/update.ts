import { NextFunction, Response } from "express";
import { ERRORS } from "../../../config/enums";
import { ArticlesTable } from "../model";

export async function updateArticle(request: any, response: Response, next: NextFunction) {
	try {
		if (!request.body.title || !request.body.content) {
			next(new Error(ERRORS.BAD_REQUEST));
		}

		const article: any = await ArticlesTable.findOne({
			where: {
				articleId: request.params.articleId,
			},
		});

		if (!article) {
			next(new Error(ERRORS.ARTICLE_NOT_FOUND));
		}

		if (article && article.ownerId !== request.user.userId) {
			next(new Error(ERRORS.ARTICLE_NOT_YOURS));
		}

		next({
			code: 200,
			message: "Article edited",
			data: {
				article: {
					articleId: parseInt(request.params.articleId),
				},
			},
		});
	} catch (err) {
		next(err);
	}
}
