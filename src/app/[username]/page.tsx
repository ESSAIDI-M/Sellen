import { createClient } from "@/lib/supabase";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: { username: string };
}

export default async function StorePage({ params }: Props) {
  const supabase = createClient();
  const { username } = params;

  // Fetch creator profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  // If creator not found
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#f0f7f0] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🌿</div>
          <h1 className="text-2xl font-bold text-[#2c493e] mb-2">
            Store not found
          </h1>
          <p className="text-[#1c1917]/60 mb-6">
            sellen.store/{username} doesn&apos;t exist yet.
          </p>
          <Link
            href="/signup"
            className="px-6 py-3 bg-[#2c493e] text-white rounded-xl font-bold text-sm hover:bg-[#5a8a6e] transition-colors"
          >
            Claim this store
          </Link>
        </div>
      </div>
    );
  }

  // Fetch creator products
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("user_id", profile.id)
    .eq("is_visible", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#f0f7f0]">

      {/* Navbar */}
      <header className="border-b border-[#2c493e]/10 bg-white/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/sellen.png" alt="Sellen" width={24} height={24} className="rounded" />
            <span className="text-sm font-bold text-[#2c493e]">Sellen</span>
          </Link>
          <Link
            href="/signup"
            className="text-xs font-bold text-[#2c493e] hover:underline"
          >
            Create your store →
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12">

        {/* Creator Profile */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-[#2c493e] flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
            {profile.display_name?.[0]?.toUpperCase() || username[0].toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold text-[#1c1917]">
            {profile.display_name || username}
          </h1>
          {profile.bio && (
            <p className="text-[#1c1917]/60 mt-2 max-w-md mx-auto text-sm leading-relaxed">
              {profile.bio}
            </p>
          )}
          <p className="text-xs text-[#2c493e]/60 mt-2">
            sellen.store/{username}
          </p>
        </div>

        {/* Products */}
        {!products || products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-[#1c1917]/40 text-sm">No products yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#2c493e]/10 p-6 hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1c1917] mb-1">
                      {product.title}
                    </h3>
                    {product.description && (
                      <p className="text-sm text-[#1c1917]/60 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xl font-black text-[#2c493e]">
                      ${product.price}
                    </p>
                  </div>
                </div>
                <button className="mt-4 w-full py-2.5 bg-[#2c493e] text-white rounded-xl font-bold text-sm hover:bg-[#5a8a6e] transition-colors">
                  Buy now
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Powered by Sellen */}
        <div className="text-center mt-16">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#1c1917]/30 hover:text-[#2c493e] transition-colors">
            <Image src="/sellen.png" alt="Sellen" width={14} height={14} className="rounded opacity-40" />
            Powered by Sellen
          </Link>
        </div>

      </main>
    </div>
  );
}