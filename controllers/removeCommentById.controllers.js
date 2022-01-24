const { deleteCommentById } = require("../models/deleteCommentById.models");

exports.removeCommentById = (req, res) => {
  deleteCommentById().then((comment) => {
    res.status(204).send({ comment });
  });
};
