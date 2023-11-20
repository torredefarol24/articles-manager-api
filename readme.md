## Setup

## 1. Install Packages

```
$ yarn install
```

## 2. Provide Environment Values

```
$ yarn setup-env-vars
```

## 3. Start Server

```
$ yarn start
```

---

# Endpoints

## [Users]

## 1. Create User

- URL: http://localhost:6767/api/v1/users
- Req Method: POST
- Req Body:

```
{
	"username": "Clark",
	"type": "admin" // admin / content-creator
}
```

- Response:

```
{
	"message": "User Created",
	"data": {
		"user": {
			"createdAt": "2023-11-20T13:18:34.134Z",
			"userId": 21,
			"username": "Clark11111",
			"type": "admin"
		}
	}
}
```

## 2. Get Token (Content-Creator)

- URL: http://localhost:6767/api/v1/users/token?tokenFor=content-creator
- Req Method: GET
- Response:

```
{
	"message": "Token Created",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInR5cGUiOiJjb250ZW50LWNyZWF0b3IiLCJpYXQiOjE3MDA0NjE0MTcsImV4cCI6MTczMTk5NzQxN30.437HDTfx0DlkTO5zdMh19Lzp8lFUP_4jaVs4sTayhdw",
		"tokenFor": "content-creator",
		"userId": 2
	}
}
```

## 3. Get Token (Admin)

- URL: http://localhost:6767/api/v1/users/token?tokenFor=admin
- Req Method: GET
- Response:

```
{
	"message": "Token Created",
	"data": {
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInR5cGUiOiJjb250ZW50LWNyZWF0b3IiLCJpYXQiOjE3MDA0NjE0MTcsImV4cCI6MTczMTk5NzQxN30.437HDTfx0DlkTO5zdMh19Lzp8lFUP_4jaVs4sTayhdw",
		"tokenFor": "admin",
		"userId": 2
	}
}
```

---

## [Articles]

## 1. Create Articles

- URL: http://localhost:6767/api/v1/articles
- Req Method: POST
- Req Headers:

```
{
	"Content-Type" 	: "application/json",
	"Authorization" : "BEARER <TOKEN>"
}
```

- Req Body:

```
{
	"title" : "insert brilliant",
	"content" : "and include descriptive content"
}
```

- Response:

```
{
	"message": "Article Created",
	"data": {
		"article": {
			"createdAt": "2023-11-20T07:06:53.751Z",
			"status": "pending",
			"articleId": 44,
			"title": "another title11112",
			"content": "the content1",
			"ownerId": 2,
			"updatedAt": "2023-11-20T07:06:53.751Z"
		}
	}
}
```

## 2. Get All Articles

- URL: http://localhost:6767/api/v1/articles
- Req Method: GET
- Req Headers:

```
{
	"Content-Type" : "application/json",
	"Authorization" : "BEARER <TOKEN>"
}
```

- response:

```
{
	"message": "Articles Fetched",
	"data": {
		"articles": [
			{
				"articleId": 24,
				"content": "the content1",
				"title": "another title1",
				"status": "published",
				"createdAt": "2023-11-19T14:30:01.000Z",
				"user": {
					"userId": 2,
					"username": "john"
				}
			},
			...
		]
	}
}
```

## 3. Get Article By Id

- URL: http://localhost:6767/api/v1/articles/39
- Req Method: GET
- Req Headers:

```

{
	"Content-Type" : "application/json",
	"Authorization" : "BEARER <TOKEN>"
}

```

- Response:

```
{
	"message": "Article Fetched",
	"data": {
		"article": {
			"articleId": 39,
			"content": "the content1",
			"title": "another title1",
			"status": "pending",
			"createdAt": "2023-11-20T06:10:49.000Z",
			"user": {
				"userId": 17,
				"username": "harry",
				"type": "content-creator"
			}
		}
	}
}
```

## 4. Publish / Reject Articles

- URL: http://localhost:6767/api/v1/articles/30
- Req Method: PUT
- Req Headers:

```

{
	"Content-Type" : "application/json",
	"Authorization" : "BEARER <TOKEN>"
}

```

- Req Body

```

{
	"status" : "published" // 'published' / 'rejected' / 'pending'
}

```

- Response:

```
{
	"message": "Article status changed",
	"data": {
		"article": {
			"articleId": 30
		}
	}
}
```

## 5. Edit Articles

- URL: http://localhost:6767/api/v1/articles/30
- Req Method: PATCH
- Req Headers:

```

{
	"Content-Type" : "application/json",
	"Authorization" : "BEARER <TOKEN>"
}

```

- Req Body:

```
{
	"title": "changed",
	"content": "content changed too"
}
```

- Response:

```
{
	"message": "Article edited",
	"data": {
		"article": {
			"articleId": 24
		}
	}
}
```

6. Delete Articles

- URL http://localhost:6767/api/v1/articles/11
- Req Method: DELETE

```

```

- Req Headers:

```

{
	"Content-Type" : "application/json",
	"Authorization" : "BEARER <TOKEN>"
}

```

- Response:

```
{
	"message": "Article Deleted"
}
```
