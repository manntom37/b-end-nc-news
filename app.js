const express = require("express");
const {
  getArticlesById,
} = require("./controllers/getArticlesById.controllers");
const { getTopics } = require("./controllers/getTopics.controllers");
const { getArticles } = require("./controllers/getArticles.controllers");
const {
  patchArticleById,
} = require("./controllers/patchArticleById.controller");
const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", getArticlesById);

app.patch("/api/articles/:article_id", patchArticleById);

app.get("/api/articles", getArticles);
module.exports = app;
