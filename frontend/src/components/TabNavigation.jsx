import { useState } from "react";

export default function TabNavigation({ className = "h-full w-full", tabs }) {
  const [active, setActive] = useState(tabs[0]);

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
