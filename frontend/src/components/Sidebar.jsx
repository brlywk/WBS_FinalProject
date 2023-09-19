import { useEffect, useState } from "react";
import useCategory from "../hooks/useCategory";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import CategoryButton from "./CategoryButton";

export default function Sidebar() {
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
    <div className="absolute left-0 top-0 w-[200px]">
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
