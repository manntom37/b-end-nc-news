const db = require("../connection.js");
const format = require("pg-format");

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  // 1. create tables
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
      return db.query(`CREATE TABLE topics (
      slug TEXT PRIMARY KEY,
      description TEXT NOT NULL 
    )`);
    })
    .then(() => {
      return db.query(`CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title TEXT,
        body TEXT NOT NULL,
        votes INT,
        topic TEXT REFERENCES topics(slug),
        author TEXT REFERENCES users(username),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    })
};

module.exports = seed;
