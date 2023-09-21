import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

export default function Homepage() {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-bold">$ubzero</h1>
          <p className="mb-3 text-lg font-medium">
            Elevate Essentials, Freeze Out the Waste — Decide What Stays
          </p>
          <p className="mb-6 text-base text-gray-800">
            Make Subscription Management a Breeze.
          </p>
          <h2 className="mb-6 text-2xl font-bold">Zero in on What Matters</h2>
          <img
            className="mb-8 rounded-lg shadow-lg"
            src="/img/screenshot-2023-09-14-at-15-36-1.png"
            alt="Screenshot"
          />
        </div>
        <div className="flex justify-end">
          {/* Show signup and login only if not logged in */}
          <SignedOut>
            <Link
              to="/signup"
              className="mr-4 rounded bg-blue-500 px-8 py-3 text-white"
            >
              SIGN UP
            </Link>
            <Link to="/login" className="rounded bg-gray-200 px-8 py-3">
              SIGN IN
            </Link>
          </SignedOut>

          {/* Show logout if logged in */}
          <SignedIn>
            <div className="flex items-center">
              <UserButton />
              <LogoutButton />
            </div>
          </SignedIn>
        </div>
        {/* Only show this when the user is signed in! */}
        <SignedIn>
          {/* Show a protected component */}
          <div>
            <hr />

            {/* Provide a link to a protected page */}
            <Link to="/test">And here is a link to a protected page!</Link>
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
