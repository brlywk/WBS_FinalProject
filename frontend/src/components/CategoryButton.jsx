import CategoryIcon from "./CategoryIcon";
import { Link } from "react-router-dom";

export default function CategoryButton({ category, to }) {
  return (
    <Link
      to={to}
      className="flex w-full transform flex-row items-center justify-start gap-4 rounded-lg p-4 shadow-none outline-none transition-transform hover:bg-white/50 focus:ring-2 active:scale-90"
    >
      <CategoryIcon icon={category.icon} />
      <div>{category.name}</div>
    </Link>
  );
}
