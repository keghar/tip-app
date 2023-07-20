import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";
import { LoginButton, LogoutButton } from "@/components/buttons";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Tip App</h1>
      <div>Hello World</div>
      <LoginButton />
      <LogoutButton />
      <h2>Server call</h2>
      {/* <pre>{JSON.stringify(session)}</pre> */}
      <h2>Client call</h2>
      <User />
    </main>
  );
}
