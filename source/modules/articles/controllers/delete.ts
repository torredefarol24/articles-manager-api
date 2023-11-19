import { NextFunction, Response } from "express";
import { ERRORS } from "../../../config/enums";
import { ArticlesTable } from "../model";

export async function deleteArticle(request: any, response: Response, next: NextFunction) {
	try {
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
