# Sellen — Complete Build Guide
> **Live site:** https://sellen.store  
> **GitHub:** https://github.com/ESSAIDI-M/Sellen  
> **Tagline:** Sell anything. Keep everything. That's Sellen.

---

## Current Status ✅

| Item | Status |
|------|--------|
| Domain sellen.store | ✅ Live |
| Vercel deployment | ✅ Live (sellen.vercel.app) |
| GitHub repo | ✅ Connected (auto-deploys on push) |
| Next.js project | ✅ Created |
| Landing page design | ✅ Ready to paste |
| Supabase account | ✅ Created |
| Stripe sandbox | ✅ Created (Platform model) |
| Hostinger domain | ✅ Paid and connected |

---

## Immediate Next Steps (Do These First)

### 1. Copy images into public folder
In VSCode → find `public/` folder → drag these files in:
- `sellen.png` (S icon favicon)
- `Sellen-logo.png` (full wordmark)
- From favicon_io.zip: `favicon.ico`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`

### 2. Replace src/app/page.tsx
Open `src/app/page.tsx` → Cmd+A → delete → paste the page.tsx code below.

### 3. Replace src/app/layout.tsx
Open `src/app/layout.tsx` → Cmd+A → delete → paste the layout.tsx code below.

### 4. Test locally
```bash
npm run dev
# Open localhost:3000 — should show Sellen landing page
```

### 5. Push to GitHub → auto-deploys to sellen.store
```bash
git add .
git commit -m "add landing page with logo and favicon"
git push
```

---

## File Contents to Paste

### src/app/layout.tsx
```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sellen — Sell anything. Keep everything.",
  description: "The all-in-one platform for creators to sell digital products, courses, and coaching. No hidden fees.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

### src/app/page.tsx
```tsx
import Image from "next/image";

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
          <button className="hidden sm:flex text-[#1c1917] text-sm font-semibold px-4 py-2 hover:text-[#2c493e] transition-colors">Log In</button>
          <button className="flex items-center justify-center rounded-lg bg-[#2c493e] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#5a8a6e] transition-all shadow-lg">Start Free Trial</button>
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
                <button className="flex min-w-[180px] items-center justify-center rounded-xl bg-[#2c493e] px-8 py-4 text-base font-bold text-white hover:scale-105 transition-transform shadow-xl shadow-[#2c493e]/30">Start Your Free Trial</button>
                <button className="flex min-w-[180px] items-center justify-center gap-2 rounded-xl border-2 border-[#2c493e]/10 bg-white px-8 py-4 text-base font-bold text-[#2c493e] hover:bg-[#2c493e]/5 transition-colors">▶ Watch Demo</button>
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
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#8fbc8f]/20 to-[#5a8a6e]/10 blur-2xl"></div>
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
                    <div className="flex flex-col items-center gap-4 rounded-2xl bg-[#f0f7f0] p-8 min-w-[200px]">
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
```

---

## Tech Stack

| Tool | Purpose | Cost |
|------|---------|------|
| Next.js 14 App Router | Frontend framework | Free |
| Vercel Hobby | Hosting + CDN + SSL | Free |
| Supabase | Database + Auth + Storage | Free |
| Stripe | Payments (sandbox now, live week 8) | $0/month |
| GitHub | Code repo + auto-deploy | Free |
| Tailwind CSS | Styling | Free |
| TypeScript | Type safety | Free |

---

## Accounts

| Service | URL |
|---------|-----|
| GitHub | github.com/ESSAIDI-M/Sellen |
| Vercel | vercel.com → project: sellen |
| Supabase | supabase.com → project: sellen |
| Stripe | dashboard.stripe.com (TEST MODE) |
| Hostinger | hpanel.hostinger.com |

---

## Environment Variables

Create `.env.local` in project root — NEVER commit to GitHub:

```bash
# Supabase (Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# Stripe (Developers → API Keys — stay in TEST mode)
STRIPE_SECRET_KEY=sk_test_YOUR_KEY
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET

# App
NEXT_PUBLIC_APP_URL=https://sellen.store
```

---

## Folder Structure

```
sellen/
├── src/
│   └── app/
│       ├── page.tsx                    ← Landing page ✅ ready to paste
│       ├── layout.tsx                  ← Favicon + metadata ✅ ready to paste
│       ├── globals.css                 ← Global styles
│       ├── login/page.tsx              ← Week 4
│       ├── signup/page.tsx             ← Week 4
│       ├── dashboard/page.tsx          ← Week 7
│       ├── [username]/page.tsx         ← Week 5
│       └── api/
│           ├── subscribe/route.ts      ← Week 6
│           └── webhook/route.ts        ← Week 6
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ProductCard.tsx
├── lib/
│   ├── supabase.ts                     ← Week 4
│   └── stripe.ts                       ← Week 6
├── public/
│   ├── sellen.png                      ← S icon (drag in now)
│   ├── Sellen-logo.png                 ← Full logo (drag in now)
│   ├── favicon.ico                     ← From favicon_io.zip
│   ├── favicon-16x16.png               ← From favicon_io.zip
│   ├── favicon-32x32.png               ← From favicon_io.zip
│   └── apple-touch-icon.png            ← From favicon_io.zip
├── .env.local                          ← API keys (never commit)
├── .gitignore
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## Supabase Tables (create in week 4)

```sql
-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  plan text default 'free',
  created_at timestamp default now(),
  primary key (id)
);

-- Products table
create table products (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  title text not null,
  description text,
  price numeric not null,
  file_url text,
  is_visible boolean default true,
  created_at timestamp default now()
);

-- Purchases table
create table purchases (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references products(id),
  buyer_email text,
  stripe_session_id text,
  created_at timestamp default now()
);
```

---

## Install Supabase (run in terminal, week 4)

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### lib/supabase.ts
```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

---

## 8-Week Build Plan

### ✅ Week 1 — HTML, CSS, JavaScript basics
- freeCodeCamp.org — HTML + CSS
- javascript.info — JS fundamentals
- Build a fake Sellen page in pure HTML

### ✅ Week 2 — React + Next.js + Setup
- nextjs.org/learn — React foundations
- Set up all accounts (done ✅)
- Connect sellen.store to Vercel (done ✅)

### 🔄 Week 3 — Landing Page (IN PROGRESS)
- [ ] Paste page.tsx (code above)
- [ ] Paste layout.tsx (code above)
- [ ] Add logo + favicon to public/
- [ ] Test localhost:3000
- [ ] Push to GitHub → live on sellen.store

### Week 4 — Auth
- [ ] Install Supabase packages
- [ ] Create lib/supabase.ts
- [ ] Build /signup page
- [ ] Build /login page
- [ ] Build protected routes (middleware)
- [ ] Create profiles table in Supabase

### Week 5 — Creator Store Page
- [ ] Create products table in Supabase
- [ ] Build /[username] dynamic route
- [ ] Show creator profile + products
- [ ] Build file upload to Supabase Storage
- [ ] Build username setup on first login

### Week 6 — Stripe Payments
- [ ] Install Stripe: `npm install stripe @stripe/stripe-js`
- [ ] Build /api/checkout route
- [ ] Build /api/webhook route
- [ ] Build /success page with download link
- [ ] Create subscription plans ($19 Creator, $49 Pro)
- [ ] Test with card: `4242 4242 4242 4242`

### Week 7 — Creator Dashboard
- [ ] Build /dashboard layout with sidebar
- [ ] Build add product form
- [ ] Build products list (edit/delete/hide)
- [ ] Build sales page with earnings
- [ ] Build settings page (name, bio, avatar)

### Week 8 — Launch 🚀
- [ ] Fix all bugs, test on mobile
- [ ] Switch Stripe test → live mode
- [ ] Email waitlist "Sellen is live!"
- [ ] DM 20 creators on Instagram/TikTok
- [ ] Post on Reddit r/SideProject + ProductHunt

---

## Pricing Strategy

| Plan | Price | Transaction Fee | Features |
|------|-------|-----------------|---------|
| Free | $0/mo | 8% | 1 product, basic store |
| Creator | $19/mo | 0% | Unlimited products, sessions, custom domain |
| Pro | $49/mo | 0% | Everything + courses, memberships, affiliates |

**Why $19 not $29:** Stan charges $29. You're new. $19 removes price objection. Raise to $29 after 500 creators.

---

## Brand Colors

```css
--primary:   #2C4A3E   /* Deep sage — main brand */
--secondary: #5A8A6E   /* Mid sage — hover */
--accent:    #8FBC8F   /* Light sage — highlights */
--bg:        #F0F7F0   /* Page background */
--dark:      #1C1917   /* Text */
```

---

## Daily Git Commands

```bash
# Check what changed
git status

# Save and push (do this every day)
git add .
git commit -m "describe what you built"
git push
# Vercel auto-deploys in 60 seconds ✅
```

---

## Claude Prompts to Use in VSCode

### Starting a new feature
```
I'm building a SaaS called Sellen using Next.js 14 App Router,
Supabase, Tailwind CSS, and TypeScript. I want to build [feature].
Show me the files I need to create and the code for each one.
```

### When you get an error
```
I'm getting this error in my Next.js + Supabase project:
[paste full error]

Here is the file:
[paste your code]

What's wrong and how do I fix it?
```

### When stuck
```
I'm trying to [goal]. I've tried [what you tried].
Here's my code: [paste]. What am I missing?
```

### Code review
```
Here is my code: [paste]
Review this for security issues or bugs before I push to production.
```

---

## Stripe Test Cards

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | ✅ Success |
| 4000 0000 0000 0002 | ❌ Declined |
| 4000 0025 0000 3155 | ⚡ 3D Secure |

Expiry: any future date (12/26) · CVC: any 3 digits (123)

---

## VSCode Extensions to Install

1. **Prettier** — auto-format on save
2. **ESLint** — catch errors as you type
3. **Tailwind CSS IntelliSense** — class autocomplete
4. **GitLens** — see git history
5. **Thunder Client** — test API routes

### VSCode settings.json
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.wordWrap": "on"
}
```

---

## Product Roadmap

| Phase | When | Features |
|-------|------|---------|
| 1 | Now | Digital products only |
| 2 | 50+ creators | 1:1 Sessions, Group Events |
| 3 | 200+ creators | Courses, Video Q&A |
| 4 | 500+ creators | Memberships, Group Programs, Affiliates |

**Rule: Never build Phase 2 until Phase 1 has real paying users.**

---

*Last updated: March 15, 2026*  
*Built with Claude + VSCode + Next.js + Supabase + Stripe*
