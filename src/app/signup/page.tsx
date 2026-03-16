"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f7f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Image src="/sellen.png" alt="Sellen" width={40} height={40} className="rounded-xl" />
            <span className="text-2xl font-bold text-[#2c493e]">Sellen</span>
          </Link>
          <p className="text-[#1c1917]/60 text-sm mt-2">Create your free store today</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#2c493e]/10 p-8">
          <h1 className="text-2xl font-bold text-[#1c1917] mb-6">Create your account</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1c1917] mb-1">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full px-4 py-3 border border-[#2c493e]/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c493e]/30 bg-[#f0f7f0]/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1c1917] mb-1">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full px-4 py-3 border border-[#2c493e]/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c493e]/30 bg-[#f0f7f0]/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1c1917] mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full px-4 py-3 border border-[#2c493e]/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c493e]/30 bg-[#f0f7f0]/50"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#2c493e] text-white rounded-xl font-bold text-sm hover:bg-[#5a8a6e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Creating account..." : "Create free account"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#1c1917]/60">
              Already have an account?{" "}
              <Link href="/login" className="text-[#2c493e] font-bold hover:underline">
                Log in
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-[#1c1917]/40">
              By signing up you agree to our{" "}
              <Link href="#" className="underline">Terms</Link> and{" "}
              <Link href="#" className="underline">Privacy Policy</Link>
            </p>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-[#1c1917]/40 mt-6">
          Free plan · 0% fees on Creator plan · sellen.store
        </p>
      </div>
    </div>
  );
}