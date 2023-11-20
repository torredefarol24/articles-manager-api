import cron from "node-cron";
import { ARTICLE_STATUS } from "../config/enums";
import { ArticlesTable } from "../modules/articles/model";

cron.schedule("* */2 * * *", async () => {
	const filter = {
		where: {
			createdAt: {
				$lte: new Date().getHours() - 2,
			},
			status: ARTICLE_STATUS.PENDING,
		},
	};

	await ArticlesTable.update({ status: ARTICLE_STATUS.PUBLISHED }, filter);
	console.log("Updating pending articles every 2 hours");
});
