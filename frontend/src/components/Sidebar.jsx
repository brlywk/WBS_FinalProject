import CategoryButton from "./CategoryButton";
import { useDataContext } from "../contexts/dataContext";

export default function Sidebar({ className = "w-full" }) {
  const { usedCategories } = useDataContext();

  return (
    <div className={className}>
      {/* Adjusted top positioning to align with Tabs */}
      {usedCategories?.length > 0 &&
        usedCategories.map((c) => (
          <CategoryButton
            key={c.name}
            category={c}
            clickHandler={() => alert(c.name)}
          />
        ))}
    </div>
  );
}
