"use client";
import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Setup() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const router = useRouter();

  const checkUsername = async (value: string) => {
    if (value.length < 3) { setAvailable(null); return; }
    setChecking(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("username", value)
      .single();
    setAvailable(!data);
    setChecking(false);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, "");
    setUsername(value);
    checkUsername(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!available) return;
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { error } = await supabase
      .from("profiles")
      .update({ username, bio })
      .eq("id", user.id);
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
        <div className="text-center mb-8">
          <Image src="/sellen.png" alt="Sellen" width={48} height={48} className="rounded-xl mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-[#2c493e]">Set up your store</h1>
          <p className="text-[#1c1917]/60 text-sm mt-1">Choose your store URL</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#2c493e]/10 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1c1917] mb-1">Your store URL</label>
              <div className="flex items-center border border-[#2c493e]/20 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#2c493e]/30">
                <span className="px-3 py-3 bg-[#f0f7f0] text-[#2c493e]/60 text-sm font-medium border-r border-[#2c493e]/20 whitespace-nowrap">
                  sellen.store/
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                  placeholder="yourname"
                  required
                  minLength={3}
                  maxLength={30}
                  className="flex-1 px-3 py-3 text-sm outline-none bg-white"
                />
                {checking && <span className="px-3 text-xs text-[#1c1917]/40">checking...</span>}
                {!checking && available === true && <span className="px-3 text-xs text-green-600 font-bold">✓ available</span>}
                {!checking && available === false && <span className="px-3 text-xs text-red-500 font-bold">✗ taken</span>}
              </div>
              <p className="text-xs text-[#1c1917]/40 mt-1">Only letters, numbers, and underscores</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1c1917] mb-1">
                Bio <span className="text-[#1c1917]/40">(optional)</span>
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell your audience what you create..."
                maxLength={160}
                rows={3}
                className="w-full px-4 py-3 border border-[#2c493e]/20 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2c493e]/30 bg-[#f0f7f0]/50 resize-none"
              />
              <p className="text-xs text-[#1c1917]/40 mt-1 text-right">{bio.length}/160</p>
            </div>

            <button
              type="submit"
              disabled={loading || !available || username.length < 3}
              className="w-full py-3 bg-[#2c493e] text-white rounded-xl font-bold text-sm hover:bg-[#5a8a6e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Setting up..." : "Launch my store 🌿"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[#1c1917]/40 mt-6">
          You can change this later in Settings
        </p>
      </div>
    </div>
  );
}