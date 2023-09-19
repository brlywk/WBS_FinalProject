export default function CategoryIcon({ icon, iconSize = 6 }) {
  const adjustedIcon = {
    ...icon,
    d: icon.path,
    path: undefined,
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`h-${iconSize} w-${iconSize}`}
    >
      <path {...adjustedIcon} />
    </svg>
  );
}
