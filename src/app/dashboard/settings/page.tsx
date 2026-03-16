"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [email, setEmail] = useState("your@email.com");
  const [saved, setSaved] = useState(false);
  const [stripeConnected, setStripeConnected] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkStripe = async () => {
      try {
        const res = await fetch("/api/stripe/status");
        const data = await res.json();
        setStripeConnected(data.connected || false);
      } catch (err) {
        console.error("Failed to check Stripe status:", err);
      }
    };
    checkStripe();
  }, []);

  const handleConnectStripe = async () => {
    setStripeLoading(true);
    try {
      const res = await fetch("/api/stripe/connect", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create Stripe link. Please try again.");
      }
    } catch (err) {
      console.error("Stripe connect error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setStripeLoading(false);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white text-[#1c1917]" style={{fontFamily:"'Space Grotesk', sans-serif"}}>
      <aside className="w-64 border-r border-[#BCE3BC] bg-white flex-col hidden md:flex flex-shrink-0">
        <div className="p-6 flex items-center gap-3">
          <Image src="/sellen.png" alt="Sellen" width={40} height={40} className="rounded-full" />
          <div>
            <h1 className="font-bold text-lg leading-tight text-[#2D5A27]">Sellen</h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Creator Studio</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {[
            { icon: "home", label: "Home", href: "/dashboard", active: false },
            { icon: "inventory_2", label: "Products", href: "/dashboard/products", active: false },
            { icon: "storefront", label: "My Store", href: "/dashboard/store", active: false },
            { icon: "analytics", label: "Analytics", href: "/dashboard/analytics", active: false },
            { icon: "settings", label: "Settings", href: "/dashboard/settings", active: true },
          ].map((item) => (
            <Link key={item.label} href={item.href} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item.active ? "bg-[#BCE3BC] text-[#2D5A27] font-bold" : "text-slate-600 hover:bg-[#BCE3BC]/20"}`}>
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#BCE3BC]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-[#BCE3BC] flex items-center justify-center text-[#2D5A27] font-bold text-sm">C</div>
            <div>
              <p className="text-sm font-medium">Creator Name</p>
              <p className="text-xs text-slate-500">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto bg-[#f6f8f6]">
        <div className="max-w-3xl mx-auto py-10 px-8">
          <header className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-6">Settings</h2>
            <div className="flex border-b border-slate-200">
              <button onClick={() => setActiveTab("general")} className={`px-6 py-3 border-b-2 text-sm font-bold transition-colors ${activeTab === "general" ? "border-[#2D5A27] text-[#2D5A27]" : "border-transparent text-slate-500 hover:text-slate-700"}`}>General</button>
              <button onClick={() => setActiveTab("billing")} className={`px-6 py-3 border-b-2 text-sm font-medium transition-colors ${activeTab === "billing" ? "border-[#2D5A27] text-[#2D5A27]" : "border-transparent text-slate-500 hover:text-slate-700"}`}>Billing</button>
            </div>
          </header>

          {activeTab === "general" && (
            <div className="space-y-8">

              <section>
                <h3 className="text-lg font-bold mb-4">Payment methods</h3>
                <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-6">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">Stripe</h4>
                    {stripeConnected ? (
                      <div>
                        <p className="text-green-600 text-sm mt-1 mb-2 font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          Connected — You can now accept payments
                        </p>
                        <a href="https://connect.stripe.com/express_login" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2 bg-slate-100 text-slate-700 rounded-lg font-bold text-sm hover:bg-slate-200 transition-colors border border-slate-200 w-fit">
                          <span className="material-symbols-outlined text-sm">open_in_new</span>
                          Open Stripe Dashboard
                        </a>
                      </div>
                    ) : (
                      <div>
                        <p className="text-slate-500 text-sm mt-1 mb-4">Connect your Stripe account to start accepting payments and manage your revenue directly.</p>
                        <button onClick={handleConnectStripe} disabled={stripeLoading} className="flex items-center gap-2 px-5 py-2 bg-[#BCE3BC]/30 text-[#2D5A27] rounded-lg font-bold text-sm hover:bg-[#BCE3BC]/50 transition-colors border border-[#BCE3BC] disabled:opacity-50">
                          <span className="material-symbols-outlined text-sm">link</span>
                          {stripeLoading ? "Connecting..." : "Connect Stripe"}
                        </button>
                      </div>
                    )}
                  </div>
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 ${stripeConnected ? "bg-green-500" : "bg-[#635BFF]"}`}>
                    <span className="text-white font-black text-2xl">{stripeConnected ? "✓" : "St"}</span>
                  </div>
                </div>
                {searchParams.get("stripe") === "success" && !stripeConnected && (
                  <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                    Stripe is verifying your account. This may take a few minutes. Refresh the page to check status.
                  </div>
                )}
              </section>

              <section>
                <div className="bg-[#BCE3BC]/20 rounded-xl p-8 border border-[#BCE3BC] flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="max-w-lg">
                    <h3 className="text-xl font-bold text-[#1c1917]">Unleash your brand 🌿</h3>
                    <p className="text-slate-600 mt-2 text-sm">Upgrade to Creator to remove Sellen branding, get 0% transaction fees, and unlock unlimited products.</p>
                  </div>
                  <button className="whitespace-nowrap px-8 py-3 bg-[#2D5A27] text-white font-bold rounded-full hover:bg-[#3d7a35] transition-all text-sm">Upgrade to Creator — $19/mo</button>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-bold mb-4">Account details</h3>
                <div className="bg-white border border-slate-200 rounded-xl p-6">
                  <div className="max-w-md space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#BCE3BC] focus:border-transparent outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Display name</label>
                      <input type="text" placeholder="Your creator name" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#BCE3BC] focus:border-transparent outline-none transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Store username</label>
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                        <span className="px-3 py-2 bg-slate-100 text-slate-500 text-sm border-r border-slate-200">sellen.store/</span>
                        <input type="text" placeholder="yourname" className="flex-1 px-3 py-2 bg-slate-50 outline-none text-sm" />
                      </div>
                    </div>
                    <div className="pt-2">
                      <button onClick={handleSave} className="px-6 py-2 bg-[#2D5A27] text-white font-bold rounded-lg text-sm hover:bg-[#3d7a35] transition-colors">{saved ? "Saved ✓" : "Save changes"}</button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="pt-4">
                <div className="border-t border-slate-200 pt-8">
                  <h3 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h3>
                  <p className="text-sm text-slate-500 mb-4">Once you delete your store, there is no going back. Please be certain.</p>
                  <button className="px-4 py-2 border border-red-200 text-red-500 rounded-lg text-sm font-medium hover:bg-red-50 transition-colors">Delete account</button>
                </div>
              </section>

            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Current Plan</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-black text-[#2D5A27]">Free</p>
                    <p className="text-sm text-slate-500 mt-1">8% transaction fee · 1 product</p>
                  </div>
                  <button className="px-6 py-3 bg-[#2D5A27] text-white rounded-xl font-bold text-sm hover:bg-[#3d7a35] transition-colors">Upgrade to Creator — $19/mo</button>
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-6">
                <h3 className="font-bold mb-4">Plan comparison</h3>
                {[
                  { feature: "Transaction fees", free: "8%", creator: "0%", pro: "0%" },
                  { feature: "Products", free: "1", creator: "Unlimited", pro: "Unlimited" },
                  { feature: "Custom domain", free: "✗", creator: "✓", pro: "✓" },
                  { feature: "1:1 Sessions", free: "✗", creator: "✓", pro: "✓" },
                  { feature: "Courses", free: "✗", creator: "✗", pro: "✓" },
                  { feature: "Memberships", free: "✗", creator: "✗", pro: "✓" },
                ].map((row, i) => (
                  <div key={row.feature} className={`grid grid-cols-4 py-3 text-sm ${i > 0 ? "border-t border-slate-100" : ""}`}>
                    <span className="text-slate-600 font-medium">{row.feature}</span>
                    <span className="text-center text-slate-500">{row.free}</span>
                    <span className={`text-center font-medium ${row.creator === "✓" || row.creator === "0%" || row.creator === "Unlimited" ? "text-[#2D5A27]" : "text-slate-400"}`}>{row.creator}</span>
                    <span className={`text-center font-medium ${row.pro === "✓" || row.pro === "0%" || row.pro === "Unlimited" ? "text-[#2D5A27]" : "text-slate-400"}`}>{row.pro}</span>
                  </div>
                ))}
                <div className="grid grid-cols-4 pt-3 border-t border-slate-100 text-sm font-bold">
                  <span></span>
                  <span className="text-center text-slate-500">Free</span>
                  <span className="text-center text-[#2D5A27]">$19/mo</span>
                  <span className="text-center text-[#2D5A27]">$49/mo</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
