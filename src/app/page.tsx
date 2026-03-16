import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f0f7f0] text-[#1c1917]">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#2c493e]/10 bg-[#f0f7f0]/80 backdrop-blur-md px-6 py-4 lg:px-40">
        <div className="flex items-center gap-2">
          <Image src="/sellen.png" alt="Sellen icon" width={32} height={32} className="rounded-lg" />
          <Image src="/Sellen-logo.png" alt="Sellen" width={100} height={28} className="h-7 w-auto" />
        </div>
        <nav className="hidden md:flex flex-1 justify-center gap-8">
          <a className="text-[#1c1917]/80 hover:text-[#2c493e] text-sm font-medium transition-colors" href="#">Product</a>
          <a className="text-[#1c1917]/80 hover:text-[#2c493e] text-sm font-medium transition-colors" href="#">Pricing</a>
          <a className="text-[#1c1917]/80 hover:text-[#2c493e] text-sm font-medium transition-colors" href="#">Resources</a>
          <a className="text-[#1c1917]/80 hover:text-[#2c493e] text-sm font-medium transition-colors" href="#">Company</a>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:flex text-[#1c1917] text-sm font-semibold px-4 py-2 hover:text-[#2c493e] transition-colors">Log In</Link>
          <Link href="/signup" className="flex items-center justify-center rounded-lg bg-[#2c493e] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#5a8a6e] transition-all shadow-lg">Start Free Trial</Link>
        </div>
      </header>

      <main className="flex-1">

        {/* HERO */}
        <section className="px-6 py-16 lg:px-40 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <span className="inline-block w-fit rounded-full bg-[#8fbc8f]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#2c493e]">For Creators, By Creators</span>
                <h1 className="text-4xl font-black leading-tight tracking-tight text-[#1c1917] sm:text-6xl lg:leading-[1.1]">
                  Sell anything.<br />Keep everything.<br />
                  <span className="text-[#2c493e]">That&apos;s Sellen.</span>
                </h1>
                <p className="text-lg font-normal leading-relaxed text-[#1c1917]/70 sm:text-xl">
                  The all-in-one platform for your digital products, courses, and coaching. No hidden fees, just your business growing.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button className="flex min-w-45 items-center justify-center rounded-xl bg-[#2c493e] px-8 py-4 text-base font-bold text-white hover:scale-105 transition-transform shadow-xl shadow-[#2c493e]/30">Start Your Free Trial</button>
                <button className="flex min-w-45 items-center justify-center gap-2 rounded-xl border-2 border-[#2c493e]/10 bg-white px-8 py-4 text-base font-bold text-[#2c493e] hover:bg-[#2c493e]/5 transition-colors">▶ Watch Demo</button>
              </div>
              <div className="flex items-center gap-4 text-sm text-[#1c1917]/60">
                <div className="flex -space-x-2">
                  {["S","A","J"].map((l) => (
                    <div key={l} className="h-8 w-8 rounded-full border-2 border-white bg-[#5a8a6e] flex items-center justify-center text-white text-xs font-bold">{l}</div>
                  ))}
                </div>
                <span>Joined by 50k+ creators this month</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-linear-to-tr from-[#8fbc8f]/20 to-[#5a8a6e]/10 blur-2xl"></div>
              <div className="relative overflow-hidden rounded-2xl border border-[#2c493e]/5 bg-white shadow-2xl">
                <div className="bg-[#2c493e] p-4 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                    <div className="w-3 h-3 rounded-full bg-white/20"></div>
                  </div>
                  <div className="flex-1 bg-white/10 rounded-md px-3 py-1 text-xs text-white/60">sellen.store/yourcreatorname</div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#f0f7f0] flex items-center justify-center overflow-hidden">
                      <Image src="/sellen.png" alt="Creator" width={40} height={40} />
                    </div>
                    <div>
                      <div className="font-bold text-[#1c1917] text-lg">Your Creator Name</div>
                      <div className="text-sm text-[#1c1917]/60">Digital creator & educator</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[
                      {label:"Total Earned",value:"$4,280"},
                      {label:"Sales",value:"128"},
                      {label:"Products",value:"3"},
                      {label:"Visitors",value:"2.4k"}
                    ].map((s) => (
                      <div key={s.label} className="bg-[#f0f7f0] rounded-xl p-4">
                        <div className="text-xs text-[#1c1917]/50 mb-1">{s.label}</div>
                        <div className="text-xl font-bold text-[#2c493e]">{s.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    {[
                      "Premium Design Templates — $29",
                      "Social Media Masterclass — $49",
                      "1:1 Coaching Session — $99"
                    ].map((p) => (
                      <div key={p} className="flex items-center justify-between p-3 rounded-lg border border-[#2c493e]/10 bg-white">
                        <span className="text-sm font-medium text-[#1c1917]">{p.split("—")[0]}</span>
                        <button className="text-xs font-bold bg-[#2c493e] text-white px-3 py-1.5 rounded-lg">Buy</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-white py-20">
          <div className="px-6 lg:px-40">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl">Everything you need to scale</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-[#1c1917]/60">Focus on creating, we&apos;ll handle the rest with tools designed for modern creators.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {icon:"💳",title:"0% Transaction Fees",desc:"Keep 100% of what you earn. No hidden cuts, no monthly surprises. Your profit stays yours."},
                {icon:"⚡",title:"All-in-One Dashboard",desc:"Manage courses, digital downloads, and link-in-bio from a single intuitive interface."},
                {icon:"🎨",title:"No Coding Required",desc:"Build your storefront in minutes with our visual drag-and-drop builder. No tech stress."},
                {icon:"🔗",title:"Smart Integrations",desc:"Connect seamlessly with your favorite email, marketing, and analytics tools."},
              ].map((f) => (
                <div key={f.title} className="group flex flex-col gap-4 rounded-2xl border border-[#2c493e]/5 bg-[#f0f7f0] p-8 transition-all hover:shadow-xl hover:-translate-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2c493e] text-white text-xl">{f.icon}</div>
                  <h3 className="text-xl font-bold text-[#1c1917]">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-[#1c1917]/70">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-[#f0f7f0] py-20">
          <div className="px-6 lg:px-40">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-[#1c1917] sm:text-4xl">Trusted by 50,000+ creators worldwide</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {name:"Alex Rivera",role:"Fitness Coach",text:"Sellen changed how I run my coaching business. The 0% fees mean I can reinvest more into my content and community."},
                {name:"Sarah Chen",role:"Digital Artist",text:"The cleanest dashboard I've ever used. Setting up my digital course took less than an hour from start to finish."},
                {name:"Jordan Smyth",role:"Marketing Consultant",text:"Finally a platform that doesn't feel like it's fighting against my brand. Pure professional depth with simple UX."},
              ].map((t) => (
                <div key={t.name} className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm border border-[#2c493e]/5">
                  <div className="flex gap-1 text-[#8fbc8f] text-xl">★★★★★</div>
                  <p className="text-[#1c1917]/80 italic leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-[#2c493e] flex items-center justify-center text-white font-bold text-lg">{t.name[0]}</div>
                    <div>
                      <h4 className="font-bold text-[#1c1917]">{t.name}</h4>
                      <p className="text-sm text-[#1c1917]/60">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="bg-[#2c493e] py-24 text-white">
          <div className="px-6 lg:px-40">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold sm:text-5xl">Simple, transparent pricing.</h2>
              <p className="mt-6 text-xl text-white/70">No complex tiers. One plan for everyone who wants to grow.</p>
              <div className="mt-16 overflow-hidden rounded-3xl bg-white text-[#1c1917] shadow-2xl">
                <div className="p-8 sm:p-12">
                  <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
                    <div className="text-left">
                      <h3 className="text-2xl font-bold">Creator Pro</h3>
                      <p className="mt-2 text-[#1c1917]/60">Everything you need to run your digital business.</p>
                      <ul className="mt-8 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                        {["0% Transaction Fees","Unlimited Products","Course Builder","1:1 Coaching Tools","Advanced Analytics","Custom Domain"].map((item) => (
                          <li key={item} className="flex items-center gap-2 font-medium">
                            <span className="text-[#8fbc8f] font-bold text-lg">✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-[#f0f7f0] p-8 min-w-50">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-black">$29</span>
                        <span className="text-lg text-[#1c1917]/60">/mo</span>
                      </div>
                      <button className="w-full rounded-xl bg-[#2c493e] px-8 py-4 text-lg font-bold text-white hover:scale-105 transition-transform">Get Started Now</button>
                      <p className="text-xs text-[#1c1917]/40 italic">7-day free trial. No credit card required.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#2c493e]/10 bg-white py-12 lg:px-40 px-6">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image src="/sellen.png" alt="Sellen" width={24} height={24} className="rounded" />
              <h2 className="text-[#2c493e] text-lg font-bold">Sellen</h2>
            </div>
            <p className="text-sm text-[#1c1917]/60">The all-in-one platform for modern creators. Sell digital products, courses, and coaching with ease.</p>
          </div>
          {[
            {title:"Product",links:["Digital Downloads","Courses","Coaching","Link-in-Bio"]},
            {title:"Company",links:["About Us","Careers","Press","Contact"]},
            {title:"Resources",links:["Blog","Help Center","Creator Academy","Community"]},
          ].map((col) => (
            <div key={col.title}>
              <h4 className="mb-6 font-bold text-[#1c1917]">{col.title}</h4>
              <ul className="flex flex-col gap-3 text-sm text-[#1c1917]/60">
                {col.links.map((link) => (
                  <li key={link}><a className="hover:text-[#2c493e] transition-colors" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#2c493e]/5 pt-8 text-xs text-[#1c1917]/40 sm:flex-row">
          <p>© 2026 Sellen Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="hover:text-[#2c493e] transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-[#2c493e] transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-[#2c493e] transition-colors" href="#">Cookies</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
