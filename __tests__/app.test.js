const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("responds with 200 code & array of treasures", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((res) => {
        expect(res.body.topics).toBeInstanceOf(Array);
        expect(res.body.topics).toHaveLength(4);
        res.body.topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});
describe("GET /api/articles/:article_id", () => {
  test("Get a specific article by article ID", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({
          article: {
            article_id: 1,
            title: "Living in the shadow of a great man",
            body: "I find this existence challenging",
            comment_count: "11",
            votes: 100,
            topic: "mitch",
            author: "butter_bridge",
            created_at: "2020-07-09T20:11:00.000Z",
          },
        });
        // console.log(res.body);
      });
  });
});
describe("PATCH /api/articles/:article_id", () => {
  test("Patch a specific article by article ID", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: 10 })
      .expect(200)
      .then(({ body }) => {
        // console.log(body.article.votes, '<<< res.text')
        expect(body.article.votes).toBe(10);
        expect(body.article.article_id).toBe(2);
      });
  });
  test("Patch a specific article by DECREASING votes", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: -10 })
      .expect(200)
      .then(({ body }) => {
        console.log(body.article.votes, "<<< no. of votes");
        expect(body.article.votes).toBe(90);
        expect(body.article.article_id).toBe(1);
      });
  });
  test("Patch a specific article by INCREASING votes from a default 100", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1 })
      .expect(200)
      .then(({ body }) => {
        console.log(body.article.votes, "<<< no. of votes");
        expect(body.article.votes).toBe(101);
        expect(body.article.article_id).toBe(1);
      });
  });
  describe("GET /api/articles", () => {
    test("responds with 200 code & array of articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((res) => {
          console.log(res.body.articles, "<<< articles ");
          expect(res.body.articles).toBeInstanceOf(Array);
        });
    });
    test("correctly defaults to sort by date, date1 < date2 etc", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then((res) => {
          expect(
            res.body.articles[0].created_at < res.body.articles[1].created_at
          ).toBe(true);
        });
    });
  });
});
