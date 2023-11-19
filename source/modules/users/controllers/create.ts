import { NextFunction } from "express";
import { UserTable } from "../model";

export async function createUser(request: any, response: any, next: NextFunction) {
	try {
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
