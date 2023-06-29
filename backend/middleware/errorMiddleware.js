const errorHandler = (err, req, res, next) => {
  // check to see if there is a status code on the error when there is an error
  // if yes set statuscode constant to the status code, if no then set it to 500
  const statuscode = res.statusCode ? res.statusCode : 500;
  // set the error message and stack sent
  // if in production then the stack will be set to nothing, if not in development
  // then it will be set to the error stack for debugging
  res.status(statuscode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
