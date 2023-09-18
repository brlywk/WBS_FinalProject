export default function errorHandler(err, req, res, next) {
  // TODO check which error types we will actually get
  console.error(err.stack);

  // check error type or error message for "Unauthorized" to return better status codes
  // and responses!

  res.status(400).send(`Error\n${err}`);
}
