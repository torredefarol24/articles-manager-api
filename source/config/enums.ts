export enum USER_TYPES {
	ADMIN = "admin",
	CONTENT_CREATOR = "content-creator",
}

export enum ARTICLE_STATUS {
	PENDING = "pending",
	REJECTED = "rejected",
	PUBLISHED = "published",
}

export enum ERRORS {
	BAD_REQUEST = "Bad Request",
	TOKEN_MISSING = "Token Missing",
	ARTICLE_NOT_FOUND = "Article not found",
	ARTICLE_NOT_YOURS = "Article not yours",
	UNAUTHORIZED = "UnAuthorized",
	ARTICLE_UNDER_REVIEW = "Article not published"
}
