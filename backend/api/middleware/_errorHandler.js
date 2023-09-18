export default function errorHandler(err, req, res, next) {
  // TODO check which error types we will actually get
  // console.error(err.stack);

  // check error type or error message for "Unauthorized" to return better status codes
  // and responses!
  console.log(err);

  let status = 400;
  let message = "";

  // For some reason request was authorized by Clerk but ID was missing
  if (err.message === "user_id_missing") {
    status = 403;
    message +=
      "Frontend Error: Request is signed but userId is missing. Access denied.";
  }

  // no body object send with post or put request
  if (err.message === "body_missing") {
    status = 400;
    message += "Request body is missing from request.";
  }

  // We got a body object, but no userId in body -> Abort
  if (err.message === "body_user_id_missing") {
    status = 403;
    message +=
      "Request body does not contain a userId. User cannot be authorized.";
  }

  if (err.message === "param_id_missing") {
    status = 400;
    message += "ID missing from request.";
  }

  res.status(status).json({ message });
}
