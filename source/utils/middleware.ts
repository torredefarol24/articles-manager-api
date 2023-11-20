import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { ERRORS } from "../config/enums";
import { ENV_CONFIG } from "../config/env";

/**
 * Middleware to check for tokens, and authenticity of tokens
 */
export function verifyToken() {
	return function (request: any, response: Response, next: NextFunction) {
		try {
			const token =
				request.headers["authorization"] && request.headers["authorization"].split(" ")[1];
			if (!token) {
				next(new Error(ERRORS.TOKEN_MISSING));
			}
			request.user = verify(token, ENV_CONFIG.JWT_KEY);

			next();
		} catch (err: any) {
			throw err;
		}
	};
}

/**
 * Middleware to determine user type, 
 * Can also be implemented by setting user roles
 */
export function checkUserType(type: string) {
	return function (request: any, response: Response, next: NextFunction) {
		try {
			if (request.user.type !== type) {
				next(new Error(ERRORS.UNAUTHORIZED));
			}
			next();
		} catch (err: any) {
			throw err;
		}
	};
}

/**
 * Basic middleware to validate request params
 */
export function checkParamsIds(ids: string[]) {
	return function (request: any, response: Response, next: NextFunction) {
		try {
			ids.map((identifier: string) => {
				if (!request.params[identifier]) {
					return response.status(400).json({
						message: "Params Missing / Bad Request",
					});
				}

				if (!parseInt(request.params[identifier])) {
					return response.status(400).json({
						message: "Invalid Params",
					});
				}
			});
			next();
		} catch (err: any) {
			throw err;
		}
	};
}
