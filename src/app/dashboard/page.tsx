"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState("yourname");
  const [displayName, setDisplayName] = useState("Creator");
  const [plan, setPlan] = useState("free");
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<unknown>(null);

  // Check auth + load profile
  useEffect(() => {
    const init = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const { data: profile } = await supabase
        .from("profiles")
        .select("username, display_name, plan")
        .eq("id", user.id)
        .single();
      if (profile?.username) {
        setUsername(profile.username);
        setDisplayName(profile.display_name || profile.username);
        setPlan(profile.plan || "free");
      }
    };
    init();
  }, [router]);

  // Load Chart.js and render chart
  useEffect(() => {
    const loadChart = async () => {
      if (!chartRef.current) return;
      // Dynamically load Chart.js
      const { Chart, registerables } = await import("chart.js");
      Chart.register(...registerables);

      if (chartInstance.current) {
        (chartInstance.current as { destroy: () => void }).destroy();
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Revenue",
              data: [0, 0, 0, 0, 0, 0, 0],
              borderColor: "#2D5A27",
              backgroundColor: "rgba(45,90,39,0.08)",
              borderWidth: 2.5,
              pointBackgroundColor: "#2D5A27",
              pointRadius: 4,
              pointHoverRadius: 6,
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "#1c1917",
              titleColor: "#fff",
              bodyColor: "#BCE3BC",
              padding: 12,
              cornerRadius: 8,
              callbacks: {
                label: (ctx) => ` $${ctx.parsed.y?.toFixed(2)}`,
              },
            },
          },
          scales: {
            x: {
              grid: { color: "rgba(188,227,188,0.15)" },
              ticks: { color: "#94a3b8", font: { size: 11 } },
            },
            y: {
              grid: { color: "rgba(188,227,188,0.15)" },
              ticks: {
                color: "#94a3b8",
                font: { size: 11 },
                callback: (v) => `$${v}`,
              },
              beginAtZero: true,
            },
          },
        },
      });
    };
    loadChart();
    return () => {
      if (chartInstance.current) {
        (chartInstance.current as { destroy: () => void }).destroy();
      }
    };
  }, []);

  const stats = [
    { label: "Total Revenue", value: "$0.00", icon: "payments", change: "+0%", positive: true },
    { label: "Total Sales", value: "0", icon: "shopping_bag", change: "0 orders", positive: true },
    { label: "Products", value: "0", icon: "inventory_2", change: "Add first", positive: true },
    { label: "Store Visitors", value: "0", icon: "visibility", change: "Share link", positive: true },
  ];

  const navItems = [
    { icon: "home", label: "Home", href: "/dashboard", active: true },
    { icon: "inventory_2", label: "Products", href: "/dashboard/products" },
    { icon: "storefront", label: "My Store", href: `/${username}` },
    { icon: "analytics", label: "Analytics", href: "/dashboard/analytics" },
    { icon: "settings", label: "Settings", href: "/dashboard/settings" },
  ];

  const aiTips = [
    { icon: "lightbulb", text: "Add your first digital product to start selling today." },
    { icon: "share", text: `Share sellen.store/${username} on your social media.` },
    { icon: "star", text: "Upgrade to Creator plan for 0% fees on all sales." },
  ];

  return (
    <div
      className="flex h-screen overflow-hidden bg-white text-[#1c1917]"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* ── SIDEBAR ── */}
      <aside className="w-64 border-r border-[#BCE3BC] bg-white flex-col hidden md:flex flex-shrink-0">
        {/* Logo */}
        <div className="p-6 flex items-center gap-3">
          <Image
            src="/sellen.png"
            alt="Sellen"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h1 className="font-bold text-lg leading-tight text-[#2D5A27]">Sellen</h1>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Creator Studio</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                item.active
                  ? "bg-[#BCE3BC] text-[#2D5A27] font-bold shadow-sm"
                  : "text-slate-500 hover:bg-[#f0f7f0] hover:text-[#2D5A27]"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Upgrade card */}
        {plan === "free" && (
          <div className="mx-4 mb-4 p-4 bg-[#2D5A27] rounded-2xl text-white">
            <p className="font-bold text-sm mb-0.5">Upgrade to Creator</p>
            <p className="text-xs text-white/60 mb-3">0% fees · unlimited products</p>
            <button className="w-full py-1.5 bg-[#BCE3BC] text-[#2D5A27] rounded-lg text-sm font-bold hover:bg-white transition-colors">
              Upgrade — $19/mo
            </button>
          </div>
        )}

        {/* User */}
        <div className="p-4 border-t border-[#BCE3BC]">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-[#BCE3BC] flex items-center justify-center text-[#2D5A27] font-bold text-sm">
              {displayName[0]?.toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-[#1c1917] truncate">{displayName}</p>
              <p className="text-xs text-slate-400 capitalize">{plan} Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="flex-1 overflow-y-auto bg-[#f6f8f6]">
        <div className="max-w-6xl mx-auto py-8 px-6 space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#1c1917]">
                Good morning, {displayName} 👋
              </h2>
              <p className="text-slate-400 text-sm mt-0.5">
                Here&apos;s what&apos;s happening with your store today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigator.clipboard.writeText(`https://sellen.store/${username}`)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 border border-[#BCE3BC] bg-white text-[#2D5A27] rounded-xl text-sm font-semibold hover:bg-[#f0f7f0] transition-colors"
              >
                <span className="material-symbols-outlined text-base">content_copy</span>
                Copy store link
              </button>
              <Link
                href="/dashboard/products/new"
                className="flex items-center gap-2 px-4 py-2 bg-[#2D5A27] text-white rounded-xl text-sm font-bold hover:bg-[#3d7a35] transition-colors shadow-sm"
              >
                <span className="material-symbols-outlined text-base">add</span>
                Add Product
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white rounded-2xl p-5 border border-[#BCE3BC]/40 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                    {s.label}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#BCE3BC]/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#2D5A27] text-base">{s.icon}</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#1c1917]">{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.change}</p>
              </div>
            ))}
          </div>

          {/* Chart + AI Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Revenue Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#BCE3BC]/40 shadow-sm">
              <div className="p-5 border-b border-[#BCE3BC]/30 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-[#1c1917]">Revenue Overview</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Your earnings over time</p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-[#BCE3BC]/30 text-[#2D5A27] rounded-full font-semibold">
                  Last 7 months
                </span>
              </div>
              <div className="p-5 h-56">
                <canvas ref={chartRef} />
              </div>
            </div>

            {/* AI Tips */}
            <div className="bg-white rounded-2xl border border-[#BCE3BC]/40 shadow-sm">
              <div className="p-5 border-b border-[#BCE3BC]/30">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#2D5A27]">auto_awesome</span>
                  <h3 className="font-bold text-[#1c1917]">Smart Tips</h3>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {aiTips.map((tip, i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-3 rounded-xl bg-[#f0f7f0] hover:bg-[#BCE3BC]/20 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[#2D5A27] text-lg mt-0.5 flex-shrink-0">
                      {tip.icon}
                    </span>
                    <p className="text-sm text-[#1c1917]/70 leading-snug">{tip.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders + Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Orders */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#BCE3BC]/40 shadow-sm">
              <div className="p-5 border-b border-[#BCE3BC]/30 flex items-center justify-between">
                <h3 className="font-bold text-[#1c1917]">Recent Orders</h3>
                <Link
                  href="/dashboard/orders"
                  className="text-xs text-[#2D5A27] font-semibold hover:underline"
                >
                  View all
                </Link>
              </div>
              <div className="p-5 flex flex-col items-center justify-center py-14 text-center">
                <div className="w-14 h-14 rounded-full bg-[#BCE3BC]/20 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[#2D5A27] text-2xl">
                    shopping_bag
                  </span>
                </div>
                <p className="font-semibold text-[#1c1917] mb-1">No orders yet</p>
                <p className="text-sm text-slate-400 mb-5 max-w-xs">
                  Add your first product and share your store link to get your first sale.
                </p>
                <Link
                  href="/dashboard/products/new"
                  className="px-5 py-2 bg-[#2D5A27] text-white rounded-xl text-sm font-bold hover:bg-[#3d7a35] transition-colors"
                >
                  Add a product
                </Link>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-[#BCE3BC]/40 shadow-sm">
              <div className="p-5 border-b border-[#BCE3BC]/30">
                <h3 className="font-bold text-[#1c1917]">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-2">
                {[
                  { icon: "add_circle", label: "Add new product", href: "/dashboard/products/new" },
                  { icon: "storefront", label: "View my store", href: `/${username}` },
                  { icon: "share", label: "Share store link", onClick: () => navigator.clipboard.writeText(`https://sellen.store/${username}`) },
                  { icon: "bar_chart", label: "View analytics", href: "/dashboard/analytics" },
                  { icon: "settings", label: "Account settings", href: "/dashboard/settings" },
                ].map((action) =>
                  action.href ? (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f0f7f0] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#BCE3BC]/20 flex items-center justify-center group-hover:bg-[#BCE3BC]/40 transition-colors">
                        <span className="material-symbols-outlined text-[#2D5A27] text-base">
                          {action.icon}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[#1c1917]">{action.label}</span>
                      <span className="material-symbols-outlined text-slate-300 text-base ml-auto">
                        chevron_right
                      </span>
                    </Link>
                  ) : (
                    <button
                      key={action.label}
                      onClick={action.onClick}
                      className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-[#f0f7f0] transition-colors group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#BCE3BC]/20 flex items-center justify-center group-hover:bg-[#BCE3BC]/40 transition-colors">
                        <span className="material-symbols-outlined text-[#2D5A27] text-base">
                          {action.icon}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-[#1c1917]">{action.label}</span>
                      <span className="material-symbols-outlined text-slate-300 text-base ml-auto">
                        chevron_right
                      </span>
                    </button>
                  )
                )}
              </div>

              {/* Store live banner */}
              <div className="mx-4 mb-4 p-4 bg-[#BCE3BC]/20 border border-[#BCE3BC] rounded-xl">
                <p className="font-bold text-[#2D5A27] text-sm">Your store is live 🌿</p>
                <p className="text-xs text-slate-500 mt-0.5 truncate">
                  sellen.store/{username}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}