import { NextFunction, Response } from "express";
import { ERRORS } from "../config/enums";

export function handleResponse(
	succOrErr: any,
	request: any,
	response: Response,
	next: NextFunction
) {
	if (succOrErr.code && succOrErr.message && succOrErr.data) {
		return response.status(succOrErr.code).json({
			message: succOrErr.message,
			data: succOrErr.data,
		});
	} else {
		console.error(`${request.method} ${request.originalUrl} ${succOrErr.toString()}`);
		let code,
			errorMessage,
			errStr = succOrErr.toString();

		switch (errStr) {
			case errStr.includes(ERRORS.TOKEN_MISSING):
				errorMessage = "Token is required";
				code = 401;
			case errStr.includes(ERRORS.UNAUTHORIZED):
				errorMessage = "UnAuthorized";
				code = 401;
			case errStr.includes("FOREIGN KEY (`ownerId`) REFERENCES `users`"):
				errorMessage = "User doesn't exist";
				code = 404;
			case errStr.includes(ERRORS.ARTICLE_NOT_FOUND):
				errorMessage = "Article doesn't exist";
				code = 404;
			case errStr.includes(ERRORS.BAD_REQUEST):
				errorMessage = "Invalid request body";
				code = 400;
			case errStr.includes(ERRORS.ARTICLE_NOT_YOURS):
				errorMessage = "You can't edit this article";
				code = 401;
			default:
				code = 500;
				errorMessage = "Something went down";
		}

		return response.status(code).json({
			message: errorMessage,
		});
	}
}
