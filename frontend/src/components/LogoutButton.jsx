import { useClerk } from "@clerk/clerk-react";

export default function LogoutButton() {
  const { signOut } = useClerk();
  return <button onClick={() => signOut()}></button>;
}
