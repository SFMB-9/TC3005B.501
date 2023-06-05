import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign out
      </button>
    </>
  );
}
