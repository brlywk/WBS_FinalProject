export default function NotificationsCard({ notification }) {
  const subscription = notification?.subscriptionId;

  return (
    <div className="cursor-pointer rounded-lg p-1 hover:bg-gray-100">
      <div className="flex flex-col items-start justify-center gap-2">
        <button onClick={() => alert("Notification")}>
          {subscription.name}
        </button>
        <button
          className="self-end text-sm"
          onClick={() => alert("Mark as read")}
        >
          Mark as read
        </button>
      </div>
    </div>
  );
}
