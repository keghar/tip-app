import { LoginButton } from "@/components/buttons";
import { RegisterForm } from "./form";

export default function RegisterPage() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-100">
      <div className="shadow-xl px-8 py-4 rounded-xl bg-white">
        <h1 className="font-semibold text-2xl py-8">Create your account</h1>
        <RegisterForm />
        <div className="flex justify-center space-x-2">
          <p>Have and account?</p> <LoginButton />
        </div>
      </div>
    </div>
  );
}
