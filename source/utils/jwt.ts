import { sign } from "jsonwebtoken";
import { ENV_CONFIG } from "../config/env";

export function createToken(data: any) {
	try {
		return sign({ userId: data.userId, type: data.type }, ENV_CONFIG.JWT_KEY, {
			expiresIn: "365d",
		});
	} catch (err: any) {
		throw err;
	}
}
