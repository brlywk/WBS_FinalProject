import SubscriptionLogo from "./SubscriptionLogos";

export default function SubscriptionListCard({ subscription, clickHandler }) {
  return (
    <div
      className="grid cursor-pointer grid-cols-[max-content_1fr_3rem] items-center rounded-md border border-white/50 bg-white/25 p-2 hover:bg-white/50"
      key={subscription?._id}
      onClick={clickHandler}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black/25 bg-gray-300/50">
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
      </div>
      <div>
        <div className="relative">
          <p className="font-medium">€{subscription.price}</p>
          <p className="text-xs text-gray-500">
            {subscription.interval === "month" ? "Monthly " : "Yearly"}
          </p>
          {subscription?.validScore && (
            <div className="absolute inset-0 flex min-w-[3rem] -translate-x-16 flex-col items-center justify-center rounded border border-black/25 p-1 text-sm text-gray-500 shadow-inner">
              <div className="text-xs">Score</div>
              <div>{subscription?.score.toFixed(2)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
