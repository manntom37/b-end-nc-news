const db = require("../connection.js");
const format = require("pg-format");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments, articles, topics, users;`)
    .then(() => {
      return db.query(`CREATE TABLE users (
        username TEXT PRIMARY KEY,
        avatar_url TEXT,
        name TEXT
      )`);
    })
    .then(() => {
      const formattedUsers = userData.map((user) => [
        user.username,
        user.avatar_url,
        user.name,
      ]);
      const sql = format(
        `INSERT INTO users (username, avatar_url, name) VALUES %L RETURNING *`,
        formattedUsers
      );
      return db.query(sql);
    })
    .then(() => {
      return db.query(`CREATE TABLE topics (
      slug TEXT PRIMARY KEY,
      description TEXT 
    )`);
    })
    .then(() => {
      const formattedTopics = topicData.map((topic) => [
        topic.slug,
        topic.description,
      ]);
      const sql = format(
        `INSERT INTO topics (slug, description) VALUES %L RETURNING *`,
        formattedTopics
      );
      return db.query(sql);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title TEXT,
        body TEXT,
        votes INT DEFAULT 0,
        topic TEXT REFERENCES topics(slug),
        author TEXT REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    })
    .then(() => {
      const formattedArticles = articleData.map((article) => [
        article.title,
        article.body,
        article.votes,
        article.topic,
        article.author,
        article.created_at,
      ]);

      const sql = format(
        `INSERT INTO articles ( title, body, votes, topic, author, created_at) VALUES %L RETURNING *`,
        formattedArticles
      );
      return db.query(sql);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author TEXT REFERENCES users(username),
        article_id SERIAL REFERENCES articles(article_id),
        votes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        body TEXT
      )`);
    })
    .then(() => {
      const formattedComments = commentData.map((comment) => [
        comment.author,
        comment.article_id,
        comment.votes,
        comment.created_at,
        comment.body,
      ]);
      const sql = format(
        `INSERT INTO comments ( author, article_id, votes, created_at, body) VALUES %L RETURNING *`,
        formattedComments
      );
      return db.query(sql);
    });
  // .then((result) => {
  //   console.log(result.rows);
  // });
};

module.exports = seed;
