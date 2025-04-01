import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {session ? (
        <>
          <p className="text-lg">Welcome, {session.user.email}!</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            onClick={() => signOut()}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl mb-4">Login</h2>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => signIn("credentials")}
          >
            Sign in with Email
          </button>
        </>
      )}
    </div>
  );
}
