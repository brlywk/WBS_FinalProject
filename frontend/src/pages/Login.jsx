// https://clerk.com/docs/components/authentication/sign-in
import { SignIn } from "@clerk/clerk-react";

export default function Login() {
  return (
    <div>
      {/* Customization of Clerk Components: https://clerk.com/docs/components/customization/overview#using-tailwind */}
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-black text-white shadow-lg hover:bg-red-500",
          },
        }}
      />
    </div>
  );
}

