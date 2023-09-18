import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/clerk-react";
import { ProtectedPart } from "./Protected";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

// just for testing
import axios from "axios";
import { useEffect } from "react";
import { apiEndpoint } from "../utils/apiEndpoints";

export default function Homepage() {
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
    <div>
      <h1>Hi, I am the homepage</h1>
      <div>
        {/* Show signup and login only if not logged in */}
        <SignedOut>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </SignedOut>

        {/* Show logout if logged in */}
        <SignedIn>
          <LogoutButton />
        </SignedIn>
      </div>
      {/* Only show this when the user is signed in! */}
      <SignedIn>
        {/* Show a protected component */}
        <ProtectedPart />
        <div>
          <hr />
          {/* Show user information */}
          <UserButton />

          {/* Provide a link to a protected page */}
          <Link to="/test">And here is a link to a protected page!</Link>
        </div>
      </SignedIn>
    </div>
  );
}
