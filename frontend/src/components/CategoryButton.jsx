import CategoryIcon from "./CategoryIcon";

export default function CategoryButton({ category, clickHandler }) {
  return (
    <button
      onClick={clickHandler}
      className="flex w-full flex-row items-center justify-start gap-4 rounded-lg p-4 hover:bg-gray-100"
    >
      <CategoryIcon icon={category.icon} />
      <div>{category.name}</div>
    </button>
  );
}
