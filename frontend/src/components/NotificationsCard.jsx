import eventEmitter from "../utils/EventEmitter";

export default function NotificationsCard({ notification }) {
  const subscription = notification?.subscriptionId;

  return (
    <>
      <div className="flex w-full items-center justify-start rounded-lg border">
        <button
          className="h-full w-full rounded-lg hover:bg-gray-100"
          onClick={() =>
            eventEmitter.emit("notificationClicked", notification?._id)
          }
        >
          {subscription.name}
        </button>
        <button
          className="place-self-end text-sm"
          onClick={() =>
            eventEmitter.emit("markNotificationAsRead", notification?._id)
          }
        >
          Mark as read
        </button>
      </div>
    </>
  );
}
