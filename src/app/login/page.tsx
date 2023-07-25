import Link from "next/link";
import { LoginForm } from "./form";

export default function LoginPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="shadow-xl px-8 py-4 rounded-xl bg-white">
        <h1 className="font-semibold text-2xl py-8">Login</h1>
        <LoginForm />

        <div className="flex justify-center space-x-2">
          <p className="text-center">
            Create Account{" "}
            <Link className="text-indigo-500 hover:underline" href="/register">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
