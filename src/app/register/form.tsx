"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        // redirect
      }
    } catch (error) {
      console.log(error);
    }

    console.log("register");
  };
  return (
    <form onSubmit={onSubmit} className="space-y-12">
      <div className="grid w-full max-w-sm items center gap-1.5">
        <Label htmlFor="email">Email</Label>

        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="email"
          type="email"
        />
      </div>
      <div className="grid w-full max-w-sm items center gap-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          type="password"
        />{" "}
      </div>
      <div className="w-full pb-8">
        <Button className="w-full border border-black rounded-lg text-white bg-black">
          Register
        </Button>
      </div>
    </form>
  );
};
