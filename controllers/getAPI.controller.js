const endpoints = require("/Users/tommann/be-nc-news/be-nc-news/endpoints.json");

exports.getAPI = (req, res) => {
  res.status(200).send({
    endpoints,
  });
};
