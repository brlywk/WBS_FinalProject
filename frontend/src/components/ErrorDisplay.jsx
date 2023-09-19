import React from "react";

export default function ErrorDisplay({
  iconSize = 6,
  message = "Error fetching data.",
}) {
  const sizeClass = `h-${iconSize} w-${iconSize}`;

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={sizeClass}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <div className="text-red-500">{message}</div>
    </div>
  );
}
