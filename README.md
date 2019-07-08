# NodeJsWithJWTAuth
Simple Node Js Application with JWT Authentication and Role Based Authorization.

# Pre-requisite needed
1. Node Js has to be installed.
2. Needed mongo atlas cloud account or local mongo installed to store data.

# To Run this project in local follow below steps.

1. This App uses Mongo DB as the database to store users and Express as the server.
2. create a file named .env in this project root directory, this is needed to keep your jwt token secret and mongo-db credentials.
3. In the .env file add these 2 lines.
```
DB_CONNECT = mongodb+srv://<url from mongo cloud atlas or local mongo db>
TOKEN_SECRET = devdcores123
```
4. Run command **npm install** , this is required to download all packages needed for App to run.
5. Run command **npm start** , to run App in localhost:3000

## Once the App starts running in localhost, Use postman to hit api's.

1. To register the user call below api. This create user in the system.

```
curl -X POST \
  http://localhost:3000/api/user/register \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"name" : "devd.reddy",
	"email" : "devd.reddy@lmi.com",
	"password" : "devdcores123"
}'
```

2. To login, call below api. This api returns JWT token in the response headers.

```
curl -X POST \
  http://localhost:3000/api/user/login \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	"email" : "devd.reddy@lmi.com",
	"password" : "devdcores123"
}'
```

3. If you create a user with name 'devd.reddy' it will have admin role, else the user will have customer role.
4. Admin role have permission to call write_post api.

```
curl -X GET \
  http://localhost:3000/api/posts/write_post \
  -H 'Accept: application/json' \
  -H 'auth_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDIyZWQ3ZGIwYzc0ZTViZWFhNWY5NmYiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1NjI1NzAxMTV9.GJR-RhoC_Jac3ngza6fEpg12UxmNDsBYfjhW04-qA_w' \
  -H 'cache-control: no-cache'
```

5. Customer role have permission to call read_post api.

```
curl -X GET \
  http://localhost:3000/api/posts/read_post \
  -H 'Accept: application/json' \
  -H 'auth_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDIyZWQ3ZGIwYzc0ZTViZWFhNWY5NmYiLCJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1NjI1NzAxMTV9.GJR-RhoC_Jac3ngza6fEpg12UxmNDsBYfjhW04-qA_w' \
  -H 'cache-control: no-cache'
```
