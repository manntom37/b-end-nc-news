const express = require("express");
const {
  getArticlesById,
} = require("./controllers/getArticlesById.controllers");
const { getTopics } = require("./controllers/getTopics.controllers");
const { getArticles } = require("./controllers/getArticles.controllers");
const {
  patchArticleById,
} = require("./controllers/patchArticleById.controller");

const {
  getArticleComments,
} = require("./controllers/getArticleComments.controllers");

const {
  postArticleComment,
} = require("./controllers/postArticleComment.controllers");

const {
  removeCommentById,
} = require("./controllers/removeCommentById.controllers");

const {getAPI} = require('./controllers/getAPI.controller')

const { reduce } = require("./db/data/test-data/articles");
const app = express();

app.use(express.json());

app.get("/api", getAPI);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById);

app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postArticleComment);

app.delete("/api/comments/:comment_id", removeCommentById);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status).send("msg: error!");
});

module.exports = app;
