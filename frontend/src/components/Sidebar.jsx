import CategoryButton from "./CategoryButton";

export default function Sidebar({ categories, className = "w-full" }) {
  return (
    <div className={className}>
      {/* Adjusted top positioning to align with Tabs */}
      {categories?.length > 0 &&
        categories.map((c) => (
          <CategoryButton
            key={c.name}
            category={c}
            clickHandler={() => alert(c.name)}
          />
        ))}
    </div>
  );
}
