import SubscriptionLogo from "./SubscriptionLogos";

export default function SubscriptionListCard({ subscription, clickHandler }) {
  return (
    <div
      className="flex cursor-pointer items-center rounded-md border border-gray-200 p-2 backdrop-blur hover:bg-white hover:bg-opacity-25"
      key={subscription?._id}
      onClick={clickHandler}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-500">
        <SubscriptionLogo subscriptionName={subscription.name} />
      </div>
      <div className="ml-[10px] flex flex-grow items-center justify-between">
        <div className="flex flex-col">
          <p className="text-sm font-medium leading-none">
            {subscription.name}
          </p>
          <p className="text-xs text-gray-500">
            {subscription.active ? "Active" : "Inactive"}
          </p>
        </div>
        <div>
          <p className="font-medium">€{subscription.price}</p>
          <p className="text-xs text-gray-500">
            {subscription.interval === "month" ? "Monthly " : "Yearly"}
          </p>
        </div>
      </div>
    </div>
  );
}
