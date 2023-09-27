import CategoryIcon from "./CategoryIcon";
import { Link } from "react-router-dom";

export default function CategoryButton({ category, to }) {
  return (
    <Link
      to={to}
      className="flex w-full flex-row items-center justify-start gap-4 rounded-lg p-4 hover:bg-gray-100/50 outline-none focus:ring-2 shadow-none transform active:scale-75 transition-transform"
    >
      <CategoryIcon icon={category.icon} />
      <div>{category.name}</div>
    </Link>
  );
}
