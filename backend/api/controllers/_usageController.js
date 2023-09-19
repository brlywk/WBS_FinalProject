import Usage from "../models/_usageSchema.js";

// ---- GET /api/usages ----
export async function getAllUsages(req, res, next) {
  const { userId } = req.query;

  console.info(
    new Date().toISOString(),
    "getAllUsages, request for user",
    userId,
  );

  const usages = await Usage.find({ userId });

  if (!usages) {
    res.status(404).send("No usages found");
  }

  res.status(200).json(usages);
}

// ---- POST /api/usages ----
export async function postUsage(req, res, next) {
  const {
    body,
    auth: { userId },
  } = req;

  console.info(
    new Date().toISOString(),
    "postUsage, request for user",
    userId,
    "with body",
    body,
  );

  const postThis = { ...body };

  // if the body request does not have the user Id, we need to add the user id
  // in order to properly associate the new usage with the user that sent it
  if (Object.hasOwn(postThis, "userId")) {
    postThis.userId = userId;
  }

  const { _id: newUsageId } = await Usage.create(postThis);

  if (!newUsageId) {
    return res.status(500).send("Something went wrong. Please try later.");
  }

  const location = `${req.protocol}://${req.get(
    "host",
  )}/api/usages/${newUsageId}`;

  res.status(201).location(location).end();
}

// ---- GET /api/usages/:id ----
export async function getUsageById(req, res, next) {
  const { id } = req.params;
  const { userId } = req.query;

  console.info(new Date().toISOString(), "getUsageById, request for id", id);

  const usage = await Usage.findOne({ _id: id, userId });

  if (!usage) {
    return res.status(404).send(`Usage ${id} not found.`);
  }

  res.status(200).json(usage);
}

// NOTE: Current assumption is that we don't need to actually edit or delete any feedback
