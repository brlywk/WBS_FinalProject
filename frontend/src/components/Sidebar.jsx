import { useEffect, useState } from "react";
import useCategory from "../hooks/useCategory";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import CategoryButton from "./CategoryButton";

export default function Sidebar({ className = "w-full" }) {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [categories, setCategories] = useState([]);
  const { getAllCategories } = useCategory();

  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(false);

    (async function () {
      try {
        const categories = await getAllCategories(abortController);
        setCategories(categories);
      } catch {
        setError(true);
      }

      setLoading(false);
    })();
  }, []);

  return (
    <div className={className}>
      {" "}
      {/* Adjusted top positioning to align with Tabs */}
      {loading && <Loading />}
      {!loading && error && (
        <ErrorDisplay message="Unable to fetch categories" />
      )}
      {!loading &&
        !error &&
        categories?.length > 0 &&
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
