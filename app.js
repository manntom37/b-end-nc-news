const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors());

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

const { reduce } = require("./db/data/test-data/articles");

app.use(express.json());

const { getAPI } = require("./controllers/getAPI.controller");

app.get("/api", getAPI);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById);

app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postArticleComment);

app.delete("/api/comments/:comment_id", removeCommentById);

const {
  handleCustomErrors,
  handleSQLErrors,
  handleInternalServerError,
} = require("./controllers/errors");

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
});

app.use(handleCustomErrors);

app.use(handleSQLErrors);

app.use(handleInternalServerError);

module.exports = app;
