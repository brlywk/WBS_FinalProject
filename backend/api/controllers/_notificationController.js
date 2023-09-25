import Notification from "../models/_notificatonSchema.js";

const MAX_DELIVERIES = 3;

// ---- GET /api/notifications
export async function getNotifications(req, res, next) {
  const { userId } = req.auth;

  console.info(
    new Date().toISOString(),
    "getNotifications, request for user",
    userId,
  );

  // get all unsent notifications for user (create 1+ week ago)
  const oneWeekAgo = new Date(new Date() - 7 * 24 * 60 * 60 * 1000);

  const notifications = await Notification.find({
    userId,
    sent: false,
    createdAt: {
      $lte: oneWeekAgo,
    },
  }).sort({
    createdAt: -1,
  });

  // if no notifications are avaible, send back an empty array to stop further
  // processing
  if (notifications?.length === 0) {
    return res.status(200).json(notifications);
  }

  // we want notifications to be delivered N times, so update after each delivery,
  // once N is reached, consider 'sent'
  const bulkUpdate = Notification.collection.initializeUnorderedBulkOp();

  notifications.forEach((notification) => {
    const updateOp = { $inc: { deliveries: 1 } };

    if (notification.deliveries + 1 >= 3) {
      updateOp.$set = { sent: true };
    }

    bulkUpdate
      .find({ _id: notification._id })
      .updateOne(updateOp, { new: true });
  });

  await bulkUpdate.execute();

  res.status(200).json(notifications);
}
