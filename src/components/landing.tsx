import Link from "next/link"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-[#4d4d4d] flex flex-col items-start justify-end pb-40 px-40">
      <div className="max-w-4xl w-full">
        <h1 className="text-7xl md:text-8xl font-bold tracking-tighter pb-3 text-start">JAMLY</h1>
        <p className="text-2xl md:text-3xl leading-relaxed text-white">
          Your <span className="text-pink-500">vote</span> shapes the <span className="text-blue-500">Playlist</span>{" "}
          <span className="text-emerald-400"></span>
        </p>
        <div className="pt-6">
          <Link
            href="/streams"
            className="inline-block border-2 border-emerald-400 text-emerald-400 px-6  py-2 text-lg hover:bg-emerald-400 hover:text-black rounded transition-colors duration-300"
          >
            Launch
          </Link>
        </div>
      </div>

      {/* Background gradient effect */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/10 via-transparent to-transparent opacity-20" />
      </div>
    </main>
  )
}

