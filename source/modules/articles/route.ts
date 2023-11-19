import { Router } from "express";
import { USER_TYPES } from "../../config/enums";
import { checkParamsIds, checkUserType, verifyToken } from "../../utils/middleware";
import { createArticle } from "./controllers/create";
import { deleteArticle } from "./controllers/delete";
import { getAll } from "./controllers/get";
import { publishArticle } from "./controllers/publish";
import { updateArticle } from "./controllers/update";

const router = Router();

router.post("/", verifyToken(), createArticle);
router.get("/", verifyToken(), getAll);
router.put(
	"/:articleId",
	[verifyToken(), checkParamsIds(["articleId"]), checkUserType(USER_TYPES.ADMIN)],
	publishArticle
);
router.patch(
	"/:articleId",
	[verifyToken(), checkParamsIds(["articleId"]), checkUserType(USER_TYPES.CONTENT_CREATOR)],
	updateArticle
);
router.delete(
	"/:articleId",
	[verifyToken(), checkParamsIds(["articleId"]), checkUserType(USER_TYPES.ADMIN)],
	deleteArticle
);

export const articleRoutes = {
	router,
	entityName: "articles",
};
