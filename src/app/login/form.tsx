"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/artist";
  //   const error = searchParams.get("error") ? "Invalid credentials" : " ";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("invalid email or password");
      }
    } catch (err: any) {}

    console.log("Login");
  };
  return (
    <form onSubmit={onSubmit} className="space-y-12">
      <div className="grid w-full max-w-sm items center gap-1.5">
        <Label htmlFor="email">Email</Label>

        <Input
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full max-w-sm items center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />{" "}
      </div>
      {error && <Alert>{error}</Alert>}
      <div className="w-full pb-8">
        <Button className="w-full border border-black rounded-lg text-white bg-black">
          Login
        </Button>
      </div>
    </form>
  );
};
