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
        // console.log(res.body.topics, ' <<< CL');
      });
  });
});
describe('GET /api/articles/:article_id', () => {
test('Get a specific article by article ID', () => {
    return request(app)
    .get("/api/articles/1")
    .expect(200)
    .then((res) => {
       expect(res.body).toEqual({
        article: {
          article_id: 1,
          title: 'Living in the shadow of a great man',
          body: 'I find this existence challenging',
          comment_count: "11",
          votes: 100,
          topic: 'mitch',
          author: 'butter_bridge',
          created_at: '2020-07-09T20:11:00.000Z'
        }
      } )
       
    })
})
})
