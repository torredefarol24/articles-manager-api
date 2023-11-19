import { NextFunction, Response } from "express";
import { ARTICLE_STATUS, ERRORS } from "../../../config/enums";
import { ArticlesTable } from "../model";

export async function publishArticle(request: any, response: Response, next: NextFunction) {
	try {
		const unacceptableStatus = Object.values(ARTICLE_STATUS).indexOf(request.body.status) >= 0;
		if (request.body.status === undefined || !unacceptableStatus) {
			next(new Error(ERRORS.BAD_REQUEST));
		}

		const result = await ArticlesTable.update(
			{ status: request.body.status },
			{
				where: {
					articleId: request.params.articleId,
				},
			}
		);

		result[0] === 1
			? next({
					code: 200,
					message: "Article status changed",
					data: {
						articleId: request.params.articleId,
					},
			  })
			: next(new Error(ERRORS.ARTICLE_NOT_FOUND));
	} catch (err) {
		next(err);
	}
}
