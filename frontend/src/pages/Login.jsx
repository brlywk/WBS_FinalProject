import { useNavigate } from "react-router-dom";
import { SignIn } from "@clerk/clerk-react";
import logo from "/subzero_logo_icon.png"; // Assuming the logo is in the public folder

export default function Login(props) {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-2">
      <img src={logo} alt="Logo" className="absolute  top-10 w-10" />
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        Welcome again
      </h2>
      {/* Customization of Clerk Components: https://clerk.com/docs/components/customization/overview#using-tailwind */}
      <SignIn onSuccess={handleSuccess} />
      <div className="mt-6 text-center">
        <p className="absolute inset-x-0 bottom-10 text-sm text-gray-500">
          <a href="/terms" className="underline">
            Terms of Use
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
