// StatsCard.jsx
export default function StatsCard({ title, value }) {
  return (
    <div className="w-1/4 h-20 rounded-lg border-2 border-white/80 bg-white/25 p-3 mt-5 mr-2 ml-2 backdrop-blur flex flex-col justify-center items-center">
      <h3 className="text-xs font-medium text-gray-800 truncate">{title}</h3>
      <p className="text-lg font-semibold truncate">{value}</p>
    </div>
  );
}
