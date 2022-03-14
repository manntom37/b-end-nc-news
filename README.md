# Welcome to NC News!

NC news is a full stack project built during my time at Northcoders.

Please ensure Node.js and Postgres (PSQL) are installed to run the project, and use 'npm start' to initialise.

The project is hosted at: https://b-end-nc-news-tom-mann.herokuapp.com/api/

## To begin: .env files
Please create 2 `.env` files:
`.env.development` &
`.env.test`, Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names)

## Endpoints

**Current Endpoints**

```http
GET /api/topics
GET /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments
DELETE /api/comments/:comment_id
GET /api
```
