const db = require("../db/connection.js");

const testData = require("../db/data/test-data/index.js");
const devData = require("../db/data/development-data/index");
const seed = require("../db/seeds/seed.js");
const request = require("supertest");
const app = require("../app");
const { get } = require("superagent");

beforeEach(() => seed(devData));
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
        expect(body.article.votes).toBe(101);
        expect(body.article.article_id).toBe(1);
      });
  });
});

describe("GET /api/articles", () => {
  test("responds with 200 code & array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
      });
  });
  test("correctly defaults to sort by date, date1 > date2 for desc order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then((res) => {
        expect(
          res.body.articles[0].created_at > res.body.articles[1].created_at
        ).toBe(true);
      });
  });
});
describe("GET /api/articles?query=???", () => {
  test("responds with 200 code & array of articles with topic 'mitch'", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        res.body.articles.forEach((article) => {
          expect(article.topic).toBe("mitch");
        });
      });
  });
  test("responds with 200 code & array of articles with topic 'cats'", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        res.body.articles.forEach((article) => {
          expect(article.topic).toBe("cats");
        });
      });
  });
  test("responds with 200 code & array of articles with author 'rogersop'", () => {
    return request(app)
      .get("/api/articles?author=rogersop")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        res.body.articles.forEach((article) => {
          expect(article.author).toBe("rogersop");
        });
      });
  });
  test("/api/articles?author=rogersop&order=asc = 200 code & array of articles with author 'rogersop' order by ASC", () => {
    return request(app)
      .get("/api/articles?author=rogersop&order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        res.body.articles.forEach((article) => {
          expect(article.author).toBe("rogersop");
          expect(
            res.body.articles[0].created_at > res.body.articles[1].created_at
          ).toBe(false);
          expect(
            res.body.articles[1].created_at < res.body.articles[2].created_at
          ).toBe(true);
        });
      });
  });
  test("/api/articles?topic=mitch&sort_by=title&order=asc = 200 code & array of articles with topic 'mitch' order by title ASC", () => {
    return request(app)
      .get("/api/articles?topic=mitch&sort_by=title&order=asc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        expect(res.body.articles[0].title).toBe("A");
      });
  });
  test("/api/articles?topic=mitch&sort_by=title&order=desc = 200 code & array of articles with topic 'mitch' order by title DESC", () => {
    return request(app)
      .get("/api/articles?topic=mitch&sort_by=title&order=desc")
      .expect(200)
      .then((res) => {
        expect(res.body.articles).toBeInstanceOf(Array);
        expect(res.body.articles[0].title).toBe("Z");
      });
  });
});
describe("GET /api/articles/:article_id/comments", () => {
  test("responds with 200 and comments for article 1", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then((res) => {
        expect(res.body.comments.length).toEqual(11);
        expect(res.body.comments).toBeInstanceOf(Array);
        res.body.comments.forEach((comment) => {
          expect(comment.article_id).toEqual(1);
        });
      });
  });
  test("returns message for artile with no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ comments: "No comments!" });
      });
  });
});

describe("POST comment", () => {
  test("responds with 201 and posted comment", () => {
    const newComment = {
      username: "icellusedkars",
      body: "Wow, a passing test!",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(201)
      .then((res) => {
        expect(res.body.comment.body).toBe("Wow, a passing test!");
      });
  });
});

describe("DELETE comment", () => {
  test("responds with 204", () => {
    return request(app).delete("/api/comments/1/").expect(204);
  });
});
// describe("GET API", () => {
//   test("responds with 200 & endpoint JSON", () => {
//     return request(app)
//       .get("/api")
//       .expect(200)
//       .then((res) => {
//         console.log(res.body);
//       });
//   });
// });
