export default function PaginationButton({
  children,
  isActive,
  isCurrent,
  clickHandler,
}) {
  return (
    <button
      disabled={!isActive}
      className={`flex items-center justify-center text-sm text-gray-500 p-2 border border-black/25 bg-white/25 w-10 h-10 rounded-lg ${
        isActive ? "hover:bg-white/50 " : " "
      } ${isCurrent ? "border-black/50 text-black" : ""}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}
