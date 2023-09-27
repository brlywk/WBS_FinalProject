import { Dialog, RadioGroup, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useDataContext } from "../contexts/dataContext"; // Context for data
import eventEmitter from "../utils/EventEmitter"; // Event emitter for handling events

// UsageTab now expects a subscriptions prop
export default function UsageModal({ opened, onClose, notificationId }) {
  // ---- CONTEXT ----
  const { notifications } = useDataContext();

  // ---- STATE ----
  const [selectedScore, setSelectedScore] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [unratedNotifications, setUnratedNotifications] = useState([]);

  // we need to rerender based on whether property and notifications are available
  useEffect(() => {
    const initialNotification = notifications?.find(
      (n) => n._id === notificationId,
    );

    // Depending on which notification the user clicked we need to reorder our notifications
    // to go through
    const remainingNotifications =
      notifications?.filter((n) => n._id !== notificationId) || [];

    const initialUnratedNotificatons = [
      initialNotification,
      ...remainingNotifications,
    ];

    setCurrentNotification(initialNotification);
    setUnratedNotifications(initialUnratedNotificatons);
  }, [notificationId, notifications]);

  // go throug all notifications currently active
  function handleChangeSubscriptionClick(direction) {
    if (direction !== 1 && direction !== -1) return;

    if (selectedScore) {
      const selectedSubscriptionId =
        unratedNotifications[currentIndex].subscriptionId._id;

      // we need to send a new event: 'usageRatingSent' -> set Rating for ID and mark Notification as read
      eventEmitter.emit(
        "useScoreSelected",
        selectedSubscriptionId,
        selectedScore,
        currentNotification._id,
      );

      // remove from unrated subscription
      setUnratedNotifications((prev) =>
        prev.filter((n) => n._id !== currentNotification._id),
      );
    }

    // just move to next or previous if nothing is selected
    if (unratedNotifications.length > 1) {
      // direction can be +/- 1 so check both edges
      const newIndex =
        unratedNotifications.findIndex(
          (n) => n._id === currentNotification._id,
        ) + direction;

      if (newIndex > unratedNotifications.length - 1) {
        // setCurrentIndex(0);
        setCurrentNotification(unratedNotifications[0]);
      } else if (newIndex < 0) {
        // setCurrentIndex(unratedNotifications.length - 1);
        setCurrentNotification(
          unratedNotifications[unratedNotifications.length - 1],
        );
      } else {
        // setCurrentIndex(newIndex);
        setCurrentNotification(unratedNotifications[newIndex]);
      }

      // IF we move selected score needs to be reset
      setSelectedScore(null);
    }
  }

  // User clicks 'done'
  // Saves score if one is selected, just closed otherwise
  function handleDoneClick() {
    if (selectedScore) {
      submitSelectedScore(
        currentNotification.subscriptionId._id,
        selectedScore,
        currentNotification._id,
      );
    }

    onClose();
  }

  // Actually send the event to save the usage score and dismiss the related notification
  function submitSelectedScore(subscriptionId, score, notificationId) {
    // Reset radiogroup
    setSelectedScore(null);

    eventEmitter.emit(
      "useScoreSelected",
      subscriptionId,
      score,
      notificationId,
    );
  }

  // Render the modal
  return (
    <Transition show={opened} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={opened}
        onClose={onClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              How often do you use{" "}
              <span className="font-bold">
                {currentNotification?.subscriptionId.name}
              </span>
              ?
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Don&apos;t think, just select!
              </p>
              <RadioGroup
                onChange={(event) => setSelectedScore(event)}
                className="mt-4"
                value={selectedScore}
              >
                <RadioGroup.Option
                  value="5"
                  className={({ checked }) =>
                    `bg-green-300 ${checked ? "ring-2 ring-black" : ""}
                    mb-4 relative flex cursor-pointer rounded-lg px-4 py-3 shadow-md focus:outline-none cursor-pointer`
                  }
                >
                  {({ checked }) => (
                    <RadioGroup.Label
                      className={checked ? "text-white" : "text-gray-900"}
                    >
                      Often
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option
                  value="3"
                  className={({ checked }) =>
                    `bg-orange-300 ${checked ? "ring-2 ring-black" : ""}
                    mb-4 rounded-lg px-4 py-3 shadow-md focus:outline-none cursor-pointer`
                  }
                >
                  {({ checked }) => (
                    <RadioGroup.Label
                      className={checked ? "text-white" : "text-gray-900"}
                    >
                      Sometimes
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
                <RadioGroup.Option
                  value="1"
                  className={({ checked }) =>
                    `bg-red-300 ${checked ? "ring-2 ring-black" : ""}
                    rounded-lg px-4 py-3 shadow-md focus:outline-none cursor-pointer`
                  }
                >
                  {({ checked }) => (
                    <RadioGroup.Label
                      className={checked ? "text-white" : "text-gray-900"}
                    >
                      Rarely
                    </RadioGroup.Label>
                  )}
                </RadioGroup.Option>
              </RadioGroup>
              <div className="flex w-full flex-row items-center justify-between">
                <button
                  onClick={handleDoneClick}
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
                >
                  Done
                </button>
                {unratedNotifications?.length > 1 && (
                  <div className="flex flex-row justify-end gap-2">
                    <button
                      onClick={() => handleChangeSubscriptionClick(-1)}
                      className="mt-4 flex items-center justify-center gap-1 rounded bg-blue-500 px-4 py-2 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                        />
                      </svg>
                      Previous
                    </button>
                    <button
                      onClick={() => handleChangeSubscriptionClick(1)}
                      className="mt-4 flex items-center justify-center gap-1 rounded bg-blue-500 px-4 py-2 text-white"
                    >
                      Next
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
