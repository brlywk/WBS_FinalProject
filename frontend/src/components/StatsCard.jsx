// StatsCard.jsx
export default function StatsCard({ title, value }) {
  return (
    <div className="w-1/5 rounded-lg border-2 border-white/80 bg-white/25 p-4 backdrop-blur">
      <h3 className="text-sm font-medium text-gray-800">{title}</h3>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
