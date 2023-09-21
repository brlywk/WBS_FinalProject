// StatsCard.jsx
export default function StatsCard({ title, value }) {
    return (
      <div className="p-4 rounded-lg bg-white/25 backdrop-blur border-2 border-white/80">
        <h3 className="text-sm font-medium text-gray-800">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    );
  }