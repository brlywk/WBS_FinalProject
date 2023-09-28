// StatsCard.jsx
export default function StatsCard({
  title,
  value,
  width = "w-1/4",
  height = "h-20",
}) {
  return (
    <div
      className={`${width} ${height} rounded-lg border-2 border-white/80 bg-white/25 p-3 mt-2 mr-2 ml-10 backdrop-blur flex flex-col justify-center items-center transition-all duration-200 ease-in-out hover:scale-105 transform-gpu text-base`}
    >
      <h3 className="truncate text-xs font-medium text-gray-800">{title}</h3>
      <div className=" text-lg font-semibold">{value}</div>
    </div>
  );
}
