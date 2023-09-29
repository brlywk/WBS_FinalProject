// StatsCard.jsx
export default function StatsCard({ title, value, children }) {
  return (
    <div className="grid h-full w-full transform-gpu cursor-default grid-rows-[max-content_1fr] items-center justify-center rounded-lg border-2 border-white/80 bg-white/25 p-3 text-base transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-lg">
      <h3 className="truncate text-center text-xs font-medium text-gray-700">
        {title}
      </h3>
      <div className="text-center text-lg font-semibold">{children}</div>
    </div>
  );
}
