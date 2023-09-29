import dotenv from "dotenv";
import Notification from "../models/_notificatonSchema.js";
dotenv.config();

const { NOTIFICATION_DAYS_AGO } = process.env;

// TODO: Debug, delete
console.log(
  "----------------------------",
  "\nNotifications",
  "\nDays Ago:",
  NOTIFICATION_DAYS_AGO,
  "\n----------------------------",
);

// ---- GET /api/notifications
export async function getNotifications(req, res, next) {
  const { userId } = req.auth;

  console.info(
    new Date().toISOString(),
    "getNotifications, request for user",
    userId,
  );

  // get all unsent notifications for user (create 1+ week ago)
  const daysAgoEnv = 0; //Number(NOTIFICATION_DAYS_AGO);
  const daysAgo = new Date(new Date() - daysAgoEnv * 24 * 60 * 60 * 1000);

  const notificationFilter = {
    userId,
    active: true,
    createdAt: {
      $lte: daysAgo,
    },
  };

  const notifications = await Notification.find(notificationFilter)
    .populate("subscriptionId")
    .sort({
      createdAt: -1,
    });

  // if no notifications are avaible, send back an empty array to stop further
  // processing
  if (notifications?.length === 0) {
    return res.status(200).json(notifications);
  }

  res.status(200).json(notifications);
}

// ---- GET /api/notifications/:id
// This one basically does nothing more than set active = false,
// as this endpoint is only used to mark a notification as read
// -> We don't really need a put request for this... we can just do a get on
// the id and be done!
export async function getAndUpdateNotificationById(req, res, next) {
  const { userId } = req.auth;
  const { id } = req.params;

  console.info(
    new Date().toISOString(),
    "putNotificationById, request for user",
    userId,
    "with id",
    id,
  );

  // TODO: If a notifiation is marked as read we need to check if a new notifications
  // needs to be created instead
  const updatedNotification = await Notification.findOneAndUpdate(
    { userId, _id: id },
    { active: false },
    { new: true },
  );

  res.status(200).json(updatedNotification);
}
