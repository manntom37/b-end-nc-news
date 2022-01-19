const { fetchTopics } = require("../models/fetchTopics.models");

exports.getTopics = (req, res, next) => {
  // console.log("in the controller!");
  fetchTopics().then((topics) => {
    res.status(200).send({ topics: topics });
  });
};
