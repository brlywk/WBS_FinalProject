export default function errorHandler(err, req, res, next) {
  // TODO check which error types we will actually get
  console.error(err.stack);

  res.status(400).send(`Error\n${err}`);
}
