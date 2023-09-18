import Subscription from "../models/_subscriptionSchema.js";

// ---- GET /api/subscriptions ----
export async function getAllSubscriptions(req, res, next) {
  // NOTE: Let's assume for now that users don't have more than a hundred
  // subscriptions, so we can rather safely forgoe pagination for now
  const { userId } = req.auth;

  const subscriptions = await Subscription.find({ userId }).populate(
    "category",
  );

  if (!subscriptions) {
    return res.status(404).send("No subscriptions found.");
  }

  res.status(200).json(subscriptions);
}

// ---- POST /api/subscriptions ----
export async function postSubscription(req, res, next) {
  const {
    body,
    auth: { userId },
  } = req;

  console.log(body);

  const postThis = { ...body };

  if (Object.hasOwn(postThis, "userId")) {
    postThis.userId = userId;
  }

  const { _id: newSubId } = await Subscription.create(postThis);

  if (!newSubId) {
    return res.status(500).send("Something went wrong. Please try later.");
  }

  const location = `${req.protocol}://${req.get(
    "host",
  )}/api/subscriptions/${newSubId}`;

  console.log(location);

  res.status(201).location(location).end();
}

// ---- GET /api/subscriptions/:id ----
export async function getSubscriptionById(req, res, next) {
  const { userId } = req.auth;
  const { id } = req.params;

  const subscription = Subscription.findOne({ _id: id, userId }).populate(
    "category",
  );

  if (!subscription) {
    return res.status(404).send(`Subscription ${id} not found.`);
  }

  res.status(200).json(subscription);
}

// ---- PUT /api/subscriptions/:id ----
export async function putSubscriptionById(req, res, next) {
  const { id } = req.params;
  const {
    body,
    auth: { userId },
  } = req;

  console.log(body);

  const putThis = { ...body };

  if (Object.hasOwn(putThis, "userId")) {
    putThis.userId = userId;
  }

  const updatedSub = await Subscription.findOneAndUpdate(
    { _id: id, userId },
    putThis,
    { new: true },
  );

  if (!updatedSub) {
    return res.status(404).send(`Subscription ${id} not found.`);
  }

  res.status(200).json(updatedSub);
}

// ---- DELETE /api/subscriptions/:id ----
export async function deleteSubscriptionById(req, res, next) {
  const { userId } = req.auth;
  const { id } = req.params;

  const result = await Subscription.deleteOne({ _id: id, userId });

  console.log("delete", result);

  if (result.deletedCount === 0) {
    return res.status(404).send(`Subscription ${id} not found.`);
  }

  if (result.acknowledged) {
    return res.status(204).end();
  }
}
