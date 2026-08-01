"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck, KeyRound, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "forgot" | "otp">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const router = useRouter();

  const handleLoginSubmit = async (e: React.FormEvent) => {
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

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to send OTP.");
      } else {
        toast.success(data.message || "OTP code sent successfully!");
        setMode("otp");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || !newPassword) {
      toast.error("Please fill in both the OTP and the new password.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, password: newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to reset password.");
      } else {
        toast.success(data.message || "Password updated successfully! Please sign in.");
        setPassword(""); // Clear old password input
        setOtp("");
        setNewPassword("");
        setMode("login");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-[#0f0f0f] flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gradient-to-br dark:from-[#2e2e2e] dark:via-[#1f1e1e] dark:to-[#131313] p-8 sm:p-10 rounded-3xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-xl space-y-6 relative overflow-hidden">
        
        {/* LOGO & TITLE HEADER */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 dark:bg-[#252525] border border-zinc-700/50 flex items-center justify-center text-white font-bold text-2xl mx-auto shadow-md">
            {mode === "login" ? "R" : <ShieldCheck className="w-7 h-7 text-white" />}
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            {mode === "login" && "Dashboard Admin Access"}
            {mode === "forgot" && "Reset Password Request"}
            {mode === "otp" && "Enter OTP Verification"}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
            {mode === "login" && "Enter your credentials to access the portfolio management panel."}
            {mode === "forgot" && "Enter your admin email to receive a 6-digit OTP verification code."}
            {mode === "otp" && `We've sent a 6-digit verification code to ${email}.`}
          </p>
        </div>

        {/* LOGIN MODE */}
        {mode === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  className="text-xs font-semibold text-zinc-500 hover:text-[var(--theme-color)] transition cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--theme-color)] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
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
        )}

        {/* FORGOT PASSWORD REQUEST MODE */}
        {mode === "forgot" && (
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--theme-color)] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold rounded-2xl border border-zinc-700/50 hover:border-[var(--theme-color)] transition-all duration-300 shadow-md cursor-pointer text-sm tracking-wide disabled:opacity-50"
            >
              {loading ? "Sending Code..." : "Send Verification OTP"}
            </button>

            <button
              type="button"
              onClick={() => setMode("login")}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-zinc-500 hover:text-zinc-850 dark:hover:text-white transition cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" /> Back to Login
            </button>
          </form>
        )}

        {/* OTP VERIFICATION & RESET PASSWORD MODE */}
        {mode === "otp" && (
          <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                6-Digit OTP Code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  placeholder="123456"
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-semibold tracking-[0.2em] text-zinc-900 dark:text-white placeholder-zinc-450 focus:outline-none focus:border-[var(--theme-color)] transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                New Secure Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type={showNewPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-zinc-100 dark:bg-[#1a1a1a] border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl text-sm font-medium text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--theme-color)] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-650 dark:hover:text-zinc-200 transition cursor-pointer"
                >
                  {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-zinc-900 hover:bg-zinc-800 dark:bg-[#252525] dark:hover:bg-[#303030] text-white font-bold rounded-2xl border border-zinc-700/50 hover:border-[var(--theme-color)] transition-all duration-300 shadow-md cursor-pointer text-sm tracking-wide disabled:opacity-50"
            >
              {loading ? "Resetting Password..." : "Verify & Reset Password"}
            </button>

            <div className="flex justify-between items-center px-1">
              <button
                type="button"
                onClick={() => setMode("forgot")}
                className="text-xs font-semibold text-zinc-500 hover:text-[var(--theme-color)] transition cursor-pointer"
              >
                Resend Code
              </button>
              <button
                type="button"
                onClick={() => setMode("login")}
                className="text-xs font-semibold text-zinc-500 hover:text-[var(--theme-color)] transition cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          </form>
        )}

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
