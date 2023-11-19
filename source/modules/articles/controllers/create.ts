import { NextFunction, Response } from "express";
import { ERRORS } from "../../../config/enums";
import { ArticlesTable } from "../model";

export async function createArticle(request: any, response: Response, next: NextFunction) {
	try {
		if (!request.body.title || !request.body.content) {
			next(new Error(ERRORS.BAD_REQUEST));
		}

		const article = await ArticlesTable.create({
			title: request.body.title.toString().trim(),
			content: request.body.content.toString().trim(),
			ownerId: request.user.userId,
		});

		next({
			code: 201,
			message: "Article Created",
			data: {
				article,
			},
		});
	} catch (err: any) {
		next(err);
	}
}
