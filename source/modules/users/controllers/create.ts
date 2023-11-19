import { NextFunction } from "express";
import { ERRORS } from "../../../config/enums";
import { UserTable } from "../model";

export async function createUser(request: any, response: any, next: NextFunction) {
	try {
		if (!request.body.username || !request.body.type) {
			next(new Error(ERRORS.BAD_REQUEST));
		}

		const user = await UserTable.create({
			username: request.body.username,
			type: request.body.type,
		});

		next({
			code: 201,
			message: "User Created",
			data: {
				user,
			},
		});
	} catch (err) {
		next(err);
	}
}
