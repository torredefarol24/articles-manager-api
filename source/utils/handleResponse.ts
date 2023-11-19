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

		let code = 500,
			errorMessage = "Something went wrong",
			errStr = succOrErr.toString();

		if (errStr.includes(ERRORS.TOKEN_MISSING)) {
			errorMessage = "Token is required";
			code = 401;
		}

		if (errStr.includes(ERRORS.UNAUTHORIZED)) {
			errorMessage = "UnAuthorized";
			code = 401;
		}

		if (errStr.includes("FOREIGN KEY (`ownerId`) REFERENCES `users`")) {
			errorMessage = "User doesn't exist";
			code = 404;
		}

		if (errStr.includes(ERRORS.ARTICLE_NOT_FOUND)) {
			errorMessage = "Article not found";
			code = 404;
		}

		if (errStr.includes(ERRORS.BAD_REQUEST)) {
			errorMessage = "Bad Request";
			code = 400;
		}

		if (errStr.includes(ERRORS.ARTICLE_NOT_YOURS)) {
			errorMessage = "You can't edit this article";
			code = 401;
		}

		return response.status(code).json({
			message: errorMessage,
		});
	}
}
