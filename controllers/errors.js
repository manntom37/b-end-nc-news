exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handleSQLErrors = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Not Found" });
  } else if (err.code === "22P02") {
    res.status(400).send({ msg: "Sorry - Bad Request" });
  } else {
    next(err);
  }
};

exports.handleInternalServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Internal server error!" });
};
