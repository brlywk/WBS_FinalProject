import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import { ProtectedPart } from "./Protected";

export default function Homepage() {
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
