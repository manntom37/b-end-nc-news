const { deleteCommentById } = require("../models/deleteCommentById.models");

exports.removeCommentById = (req, res, next) => {
  deleteCommentById().then((comment) => {
    res.status(204).send({ comment });
  });
};
