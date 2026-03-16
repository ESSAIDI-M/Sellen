"use client";
import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex h-screen overflow-hidden bg-white text-[#1c1917]" style={{fontFamily:"'Space Grotesk', sans-serif"}}>

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-[#BCE3BC] bg-white flex flex-col hidden md:flex flex-shrink-0">
        <div className="p-6 flex items-center gap-3">
          <Image src="/sellen.png" alt="Sellen" width={40} height={40} className="rounded-full" />
          <div>
            <h1 className="font-bold text-lg leading-tight text-[#2D5A27]">Sellen</h1>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Creator Studio</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { icon: "home", label: "Home", href: "/dashboard", active: true },
            { icon: "inventory_2", label: "Products", href: "/dashboard/products", active: false },
            { icon: "storefront", label: "My Store", href: "/dashboard/store", active: false },
            { icon: "analytics", label: "Analytics", href: "/dashboard/analytics", active: false },
            { icon: "settings", label: "Settings", href: "/dashboard/settings", active: false },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? "bg-[#BCE3BC] text-[#2D5A27] font-bold"
                  : "text-slate-600 hover:bg-[#BCE3BC]/20"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-[#BCE3BC]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-[#BCE3BC] flex items-center justify-center text-[#2D5A27] font-bold text-sm">C</div>
            <div>
              <p className="text-sm font-medium text-[#1c1917]">Creator Name</p>
              <p className="text-xs text-slate-500">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-[#f6f8f6]">
        <div className="max-w-6xl mx-auto py-8 px-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#1c1917]">Dashboard</h2>
              <p className="text-slate-500 text-sm mt-1">Welcome back! Here&apos;s what&apos;s happening.</p>
            </div>
            <Link
              href="/dashboard/products/new"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#2D5A27] text-white rounded-lg font-bold text-sm hover:bg-[#3d7a35] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              Add Product
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Revenue", value: "$0.00", icon: "payments", change: "Start selling today" },
              { label: "Total Sales", value: "0", icon: "shopping_bag", change: "No sales yet" },
              { label: "Products", value: "0", icon: "inventory_2", change: "Add your first product" },
              { label: "Store Visitors", value: "0", icon: "visibility", change: "Share your store link" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-5 border border-[#BCE3BC]/40 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</span>
                  <div className="w-8 h-8 rounded-lg bg-[#BCE3BC]/30 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#2D5A27] text-base">{stat.icon}</span>
                  </div>
                </div>
                <p className="text-2xl font-bold text-[#1c1917]">{stat.value}</p>
                <p className="text-xs text-slate-400 mt-1">{stat.change}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Recent Sales */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-[#BCE3BC]/40 shadow-sm">
              <div className="p-5 border-b border-[#BCE3BC]/40 flex items-center justify-between">
                <h3 className="font-bold text-[#1c1917]">Recent Sales</h3>
                <Link href="/dashboard/analytics" className="text-xs text-[#2D5A27] font-medium hover:underline">View all</Link>
              </div>
              <div className="p-5">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#BCE3BC]/20 flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-[#2D5A27] text-2xl">shopping_bag</span>
                  </div>
                  <p className="font-medium text-[#1c1917] mb-1">No sales yet</p>
                  <p className="text-sm text-slate-500 mb-4">Add your first product to start selling</p>
                  <Link
                    href="/dashboard/products/new"
                    className="px-4 py-2 bg-[#2D5A27] text-white rounded-lg text-sm font-bold hover:bg-[#3d7a35] transition-colors"
                  >
                    Add a product
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-[#BCE3BC]/40 shadow-sm">
              <div className="p-5 border-b border-[#BCE3BC]/40">
                <h3 className="font-bold text-[#1c1917]">Quick Actions</h3>
              </div>
              <div className="p-5 space-y-3">
                {[
                  { icon: "add_circle", label: "Add new product", href: "/dashboard/products/new" },
                  { icon: "storefront", label: "View my store", href: "/" },
                  { icon: "share", label: "Share store link", href: "#" },
                  { icon: "settings", label: "Account settings", href: "/dashboard/settings" },
                ].map((action) => (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#BCE3BC]/10 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#BCE3BC]/20 flex items-center justify-center group-hover:bg-[#BCE3BC]/40 transition-colors">
                      <span className="material-symbols-outlined text-[#2D5A27] text-base">{action.icon}</span>
                    </div>
                    <span className="text-sm font-medium text-[#1c1917]">{action.label}</span>
                    <span className="material-symbols-outlined text-slate-300 text-base ml-auto">chevron_right</span>
                  </Link>
                ))}
              </div>

              {/* Upgrade banner */}
              <div className="mx-5 mb-5 p-4 bg-[#2D5A27] rounded-xl text-white">
                <p className="font-bold text-sm mb-1">Upgrade to Creator</p>
                <p className="text-xs text-white/70 mb-3">0% fees + unlimited products</p>
                <button className="w-full py-2 bg-[#BCE3BC] text-[#2D5A27] rounded-lg text-sm font-bold hover:bg-[#a8d8a8] transition-colors">
                  Upgrade — $19/mo
                </button>
              </div>
            </div>

          </div>

          {/* Store Link Banner */}
          <div className="mt-6 bg-[#BCE3BC]/20 border border-[#BCE3BC] rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="font-bold text-[#2D5A27]">Your store is live 🌿</p>
              <p className="text-sm text-slate-600 mt-0.5">sellen.store/<span className="font-medium">yourname</span></p>
            </div>
            <button
              onClick={() => navigator.clipboard.writeText("https://sellen.store/yourname")}
              className="flex items-center gap-2 px-4 py-2 bg-[#2D5A27] text-white rounded-lg text-sm font-bold hover:bg-[#3d7a35] transition-colors"
            >
              <span className="material-symbols-outlined text-sm">content_copy</span>
              Copy link
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}