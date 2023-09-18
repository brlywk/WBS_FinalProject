export function checkUserId(req, res, next) {
  const { userId } = req.auth;

  if (!userId) {
    throw new Error("user_id_missing");
  }

  next();
}

export function checkBody(req, res, next) {
  const { body } = req;

  if (!body) {
    throw new Error("body_missing");
  }

  // if body is present but no user id is provided we need to exit
  if (!Object.hasOwn(body, "userId")) {
    throw new Error("body_user_id_missing");
  }

  next();
}

export function checkParamForId(req, res, next) {
  const { id } = req.params;

  if (!id) {
    throw new Error("param_id_missing");
  }

  next();
}
