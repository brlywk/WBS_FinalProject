import "daisyui/dist/full.css";
import { useEffect, useState } from "react";

export default function Loading() {
  const INTERVAL_TIME_SECONDS = 3;

  const [message, setMessage] = useState("");

  const loadingMessages = [
    "Fetching your subscriptions...",
    "Fetching your subscriptions...",
    "Fetching your subscriptions...",
    "Fetching your subscriptions...",
    "Fetching notifications...",
    "Fetching notifications...",
    "Fetching usage data...",
    "Fetching usage data...",
    "Fetching category data...",
    "Fetching category data...",
    "Drawing visualisation...",
    "Drawing visualisation...",
    "Looking for that notification that fell under the couch...",
    "Paying fetch with the dog...",
    "Lost one of the charts, redrawing from memory...",
  ];

  useEffect(() => {
    function pickRandomMessage() {
      const randomMsg =
        loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

      setMessage(randomMsg);
    }

    const interval = setInterval(
      pickRandomMessage,
      INTERVAL_TIME_SECONDS * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="loading loading-ring h-24 w-24"></div>
      <div className="p-6 text-black/50">{message}</div>
    </div>
  );
}
