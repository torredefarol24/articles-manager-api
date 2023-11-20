import { NextFunction } from "express";
import { ERRORS } from "../../../config/enums";
import { createToken } from "../../../utils/jwt";
import { UserTable } from "../model";

export async function getToken(request: any, response: any, next: NextFunction) {
	try {
		const tokenFor = request.query.tokenFor;
		if (!tokenFor) {
			next(new Error(ERRORS.BAD_REQUEST));
		}

		const user: any = await UserTable.findOne({
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
				userId: user.userId,
			},
		});
	} catch (err) {
		next(err);
	}
}
