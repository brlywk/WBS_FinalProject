// StatsCard.jsx
export default function StatsCard({ title, value }) {
    return (
      <div className="p-4 rounded-lg bg-gray-200">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    );
  }