import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { ProtectedPart } from "./Protected";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import axios from "axios";
import { useEffect } from "react";
import { apiEndpoint } from "../utils/apiEndpoints";

export default function Homepage() {
  // access JWT from clerk session
  const { getToken } = useAuth();

  const testApi = `${apiEndpoint}/restricted`;

  useEffect(() => {
    // we need to get the token to authenticate our requests to Clerk
    // BUT getting the token is async, so we have to wrap everything
    // in an async function before calling that function...
    // ... probably a good idea to make this into a helper function for easier use
    //     later on
    async function authGetReq() {
      const token = await getToken();

      axios
        .get(testApi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }

    authGetReq();
  }, []);

  return (
    <div className="bg-gray-100 h-screen flex items-center justify-center">
      <div className="max-w-3xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">$ubzero</h1>
          <p className="text-lg font-medium mb-3">
            Elevate Essentials, Freeze Out the Waste — Decide What Stays
          </p>
          <p className="text-base text-gray-800 mb-6">
            Make Subscription Management a Breeze.
          </p>
          <h2 className="text-2xl font-bold mb-6">
            Zero in on What Matters
          </h2>
          <img 
            className="rounded-lg shadow-lg mb-8"
            src="/img/screenshot-2023-09-14-at-15-36-1.png" 
            alt="Screenshot"
          />
        </div>
        <div className="flex justify-end">
          {/* Show signup and login only if not logged in */}
          <SignedOut>
            <Link to="/signup" className="bg-blue-500 text-white px-8 py-3 rounded mr-4">SIGN UP</Link>
            <Link to="/login" className="bg-gray-200 px-8 py-3 rounded">SIGN IN</Link>
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
          <ProtectedPart />
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
