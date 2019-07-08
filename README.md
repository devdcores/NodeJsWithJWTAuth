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
TOKEN_SECRET = devdcores
```
4. Run command **npm install** , this is required to download all packages needed for App to run.
5. Run command **npm start** , to run App in localhost:3000

