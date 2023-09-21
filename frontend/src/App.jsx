import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import ApiTest from "./pages/ApiTest";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// access our key
const publishableKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;

// If we cannot read our key, we need to exit
if (!publishableKey) {
  throw new Error("Unable to access Publishable Key.");
}

// Our app has to be wrapped in a Clerk provider that will take also care
// of routing
function ClerkRouteProvider() {
  const navigate = useNavigate();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      navigate={(to) => navigate(to)}
    >
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <>
              {/* If signed in, load this page / component */}
              <SignedIn>
                <Dashboard />
              </SignedIn>

              {/* If not signed in, show this when user accesses route */}
              <SignedOut>
                <div>You are not allowed here!</div>
              </SignedOut>
            </>
          }
        />
        <Route
          path="/apiTest"
          element={
            <>
              <SignedIn>
                <ApiTest />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" />
              </SignedOut>
            </>
          }
        />

        {/* Needs to be the last one! */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkRouteProvider />
    </BrowserRouter>
  );
}

export default App;
