// StatsCard.jsx
export default function StatsCard({ title, value }) {
  return (
    <div className="w-full h-20 rounded-lg border-2 border-white/80 bg-white/25 p-3 mt-2 mr-2 ml-10 backdrop-blur flex flex-col justify-center items-center transition-all duration-200 ease-in-out hover:scale-105 transform-gpu text-base">
      <h3 className="text-sm font-medium text-gray-800 truncate">{title}</h3>
      <p className="text-xl font-semibold truncate">{value}</p>
    </div>
  );
}
