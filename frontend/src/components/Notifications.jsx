import { Popover } from "@headlessui/react";

import NotificationsCard from "./NotificationsCard";

import useNotifications from "../hooks/useNotifications";
import { useDataContext } from "../contexts/dataContext";

export default function Notifications() {
  // ---- CONTEXT ----
  const { notifications } = useDataContext();

  // ---- CUSTOM HOOK ----
  const { getAndUpdateNotificationById } = useNotifications();

  console.log("NOTIF COMP", "Notifications", notifications?.length);
  console.log("NOTIF COMP", notifications);

  return (
    <Popover className="relative">
      <Popover.Button className="relative rounded-full border border-black/25 bg-white/25 p-1 hover:bg-white/50">
        {/* SVG Icon */}
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
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>

        {/* Notifications */}
        {notifications?.length > 0 && (
          <div className="absolute bottom-0 right-0 flex h-4 w-4 translate-x-1 translate-y-1 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
            {notifications?.length}
          </div>
        )}
      </Popover.Button>

      <Popover.Panel className="absolute z-10 min-w-[15vw] -translate-x-1/2 translate-y-2 rounded-xl bg-white p-2 shadow-xl">
        <div className="grid gap-2">
          {notifications?.length > 0 &&
            notifications?.map((notification) => (
              <NotificationsCard
                key={notification._id}
                notification={notification}
              />
            ))}
        </div>
      </Popover.Panel>
    </Popover>
  );
}
