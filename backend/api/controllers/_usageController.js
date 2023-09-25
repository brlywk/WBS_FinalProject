import { startSession } from "mongoose";
import Usage from "../models/_usageSchema.js";
import Notification from "../models/_notificatonSchema.js";

// ---- GET /api/usages ----
export async function getAllUsages(req, res, next) {
  const { userId } = req.query;

  console.info(
    new Date().toISOString(),
    "getAllUsages, request for user",
    userId,
  );

  const usages = await Usage.find({ userId });

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
  if (!Object.hasOwn(postThis, "userId")) {
    postThis.userId = userId;
  }

  // const { _id: newUsageId } = await Usage.create(postThis);
  //
  // if (!newUsageId) {
  //   return res.status(500).send("Something went wrong. Please try later.");
  // }
  //
  // const location = `${req.protocol}://${req.get(
  //   "host",
  // )}/api/usages/${newUsageId}`;

  // We need to create a new notification for this subscription and invalidate
  // all notifications still 'not sent' (as we only want one notification per sub)

  const createUsageSession = await startSession();
  createUsageSession.startTransaction();

  try {
    // 1. get all notifications with sent = false
    const previousNotifications = await Notification.find(
      {
        userId,
        subscriptionId: body.subscriptionId,
      },
      null,
      { session: createUsageSession },
    );

    // 2. update these notifications to sent = true
    const notificatonUpdateResult = await Notification.updateMany(
      { _id: { $in: previousNotifications.map((n) => n._id) } },
      { sent: true },
      { session: createUsageSession },
    );

    if (
      notificatonUpdateResult.modifiedCount !== previousNotifications.length
    ) {
      throw new Error(
        `Failed to update all notifications when creating new usage for ${body.subscriptionId}`,
      );
    }

    // 3. create new notification for subscription
    const newNotification = {
      userId,
      type: "usage",
      subscriptionId: body.subscriptionId,
    };

    await Notification.create([newNotification], {
      session: createUsageSession,
    });

    // 4. Create new Usage
    const [newUsage] = await Usage.create([postThis], {
      session: createUsageSession,
    });

    const newUsageId = newUsage._id;

    // commit changes and close session
    await createUsageSession.commitTransaction();
    createUsageSession.endSession();

    const location = `${req.protocol}://${req.get(
      "host",
    )}/api/usages/${newUsageId}`;

    res.status(201).location(location).end();
  } catch (error) {
    console.error("Create Usage Transaction", error);
    createUsageSession.abortTransaction();
    createUsageSession.endSession();

    res.status(500).send("Error creating Usage and related data.");
  }
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
