import { useState } from "react";

export default function TabNavigation({
  className = "h-full w-full",
  tabs,
  initialTabIndex = 0,
}) {
  // Safety: if initial index happens to be out of bounds for the tabs, set to last tab
  if (initialTabIndex > tabs?.length - 1) {
    initialTabIndex = tabs?.length - 1;
  }
  const [active, setActive] = useState(tabs[initialTabIndex]);

  const buttonStyle = " border-b-2 p-2 hover:border-black/25";

  return (
    <div className={className}>
      <div className="grid">
        <div className="flex w-full justify-around p-2">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={
                (active.name === tab.name
                  ? "border-black"
                  : "border-transparent") + buttonStyle
              }
              onClick={() => setActive(tab)}
            >
              {tab.name}
            </button>
          ))}
        </div>
        <div className="p-2">{active.element}</div>
      </div>
    </div>
  );
}
