// StatsCard.jsx
export default function StatsCard({ title, value, children }) {
  return (
    <div className="flex h-full w-full transform-gpu cursor-default flex-col items-center justify-center rounded-lg border-2 border-white/80 bg-white/25 p-3 text-base transition-all duration-200 ease-in-out hover:scale-105">
      <h3 className="truncate text-xs font-medium text-gray-800">{title}</h3>
      <div className="text-lg font-semibold">{children}</div>
    </div>
  );
}
