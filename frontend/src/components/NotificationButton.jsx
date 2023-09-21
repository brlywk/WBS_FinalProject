import CategoryIcon from "./CategoryIcon";

export default function CategoryButton({
  category,
  clickHandler,
  notifications = 2,
}) {
  return (
    <button
      onClick={clickHandler}
      className="relative flex w-full flex-row items-center justify-start gap-4 rounded-lg p-4 hover:bg-gray-100"
    >
      <CategoryIcon icon={category.icon} />
      <div>{category.name}</div>
      {notifications && (
        <div className="absolute flex h-4 w-4 -translate-x-2 -translate-y-2 items-center justify-center rounded-full bg-blue-600 p-2 text-xs text-white">
          {notifications}
        </div>
      )}
    </button>
  );
}
