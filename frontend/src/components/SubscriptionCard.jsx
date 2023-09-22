import eventEmitter from "../utils/EventEmitter";

export default function SubscriptionCard({ subscription }) {
  // ---- Functions ----
  function openSubscriptionForm() {
    eventEmitter.emit("openSubscriptionForm", subscription, "show");
  }

  return (
    <>
      <button
        className="grid w-full grid-cols-[max-content_1fr] justify-center gap-4 rounded-lg bg-gray-100 p-4"
        onClick={openSubscriptionForm}
      >
        {/* Adjusted ml-10 to ml-6 to decrease the gap next to each card by 20px */}
        <div className="self-center">
          {/* This div will create a grey circle around the icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8 rounded-full bg-gray-500/50 p-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 13.5H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-medium">{subscription?.name}</h3>
          <p className="text-gray-600">
            {subscription?.active ? "Active" : "Inactive"}
          </p>
          <p className="text-lg font-semibold">EUR {subscription?.price}</p>
        </div>
      </button>
    </>
  );
}
