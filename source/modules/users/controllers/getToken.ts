import { NextFunction } from "express";
import { createToken } from "../../../utils/jwt";
import { UserTable } from "../model";

export async function getToken(request: any, response: any, next: NextFunction) {
	try {
		const tokenFor = request.query.tokenFor;
		const user = await UserTable.findOne({
			where: {
				type: request.query.tokenFor,
			},
		});

		const token = createToken(user);
		next({
			code: 200,
			message: "Token Created",
			data: {
				token,
				tokenFor,
			},
		});
	} catch (err) {
		next(err);
	}
}
