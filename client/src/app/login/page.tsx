"use client";

import { post } from "@/utils/request";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import validator from "validator";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const readyToSubmit = useMemo(
    () => validator.isEmail(email) && password,
    [email, password]
  );

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const res = await post("/auth/login", {
      email,
      password,
    });
    console.log(res);
    router.push("/");
  };
  return (
    <div className="relative h-full flex flex-col justify-center items-center gap-4 text-black">
      <div className="flex gap-4 items-center">
        <Image
          className="w-16"
          src="/logo.svg"
          alt="Logo"
          width={128}
          height={92}
        />
        <h1 className="text-3xl font-bold">Login to an account!</h1>
      </div>
      <form
        className="space-y-6 flex flex-col w-full max-w-[800px]"
        name="login-form"
        onSubmit={handleOnSubmit}
      >
        <div className="space-y-2">
          <label htmlFor="login-email">Email</label>
          <input
            name="login-email"
            id="login-email"
            className="w-full px-4 py-2 rounded-lg border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]"
            type="text"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="login-password">Password</label>
          <input
            name="login-password"
            id="login-password"
            className="w-full px-4 py-2 rounded-lg border border-black shadow-[2px_2px_0_rgb(0,_0,_0)]"
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="text-center w-full py-4 bg-black text-white form-button rounded-lg cursor-pointer disabled:cursor-not-allowed disabled:text-white/25"
          type="submit"
          disabled={!readyToSubmit}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
