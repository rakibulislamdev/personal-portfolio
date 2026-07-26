"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid admin credentials!");
      } else {
        toast.success("Welcome to Dashboard!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      toast.error("Something went wrong during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#0f0f0f] flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-8 sm:p-10 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-xl space-y-6 relative overflow-hidden">
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 dark:bg-[#252525] border border-zinc-700/50 flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-md">
            R
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Dashboard Admin Access
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Enter your credentials to access the portfolio management panel.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3.5 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--theme-color)] transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--theme-color)] transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold rounded-2xl border border-zinc-700/50 hover:border-[var(--theme-color)] transition-all duration-300 shadow-md cursor-pointer text-sm tracking-wide disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="text-center pt-2">
          <a
            href="/"
            className="text-xs font-semibold text-zinc-500 hover:text-[var(--theme-color)] transition"
          >
            ← Return to Portfolio
          </a>
        </div>
      </div>
    </div>
  );
}
