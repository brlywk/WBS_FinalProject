import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const [redirectTime, setRedirectTime] = useState(3);

  const navigate = useNavigate();

  useEffect(() => {
    function countDown() {
      if (redirectTime > 0) {
        setRedirectTime((prev) => prev - 1);
      } else {
        navigate("/");
      }
    }

    const interval = setInterval(countDown, 1000);

    return () => clearInterval(interval);
  }, [redirectTime]);

  return (
    <div
      className="flex h-screen flex-col items-center justify-center"
      id="error-page"
    >
      <h1 className="text-xl">Oops!</h1>
      <p>
        You&apos;ve tried to access a page that does not exist. You will be
        redirected to the main page in {redirectTime} seconds.
      </p>
    </div>
  );
}
