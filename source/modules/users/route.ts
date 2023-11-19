import { Router } from "express";
import { createUser } from "./controllers/create";
import { getToken } from "./controllers/getToken";

const router = Router();

router.post("/", createUser);
router.get("/token", getToken);

export const userRoutes = {
	router,
	entityName: "users",
};
