import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"

interface NavbarProps {
  theme: "dark" | "light"
}

export function Navbar({ theme }: NavbarProps) {

  const session = useSession()

  return (
    <div className="fixed top-0 w-full px-2 ">
      <nav className={`flex items-center justify-between rounded-b-3xl px-10 border-b-[0.5px] border-[#a9a9a9] ${theme === "dark" ? "bg-[#1a1a1a] backdrop-blur-xl" : "bg-[#eeeeee] backdrop-blur-xl"
        }`}>
        <div className="text-sm font-medium tracking-wide ">
          <Link href={"/"}><span className="text-[#a9a9a9] font-semibold">JAMLY</span></Link>
        </div>
        <div className="flex items-center text-[#a9a9a9] space-x-10 p-1.5">
          <Link
            href="/settings"
            className={`text-sm tracking-wide  ${theme === "dark" ? "text-white/90" : "text-black/90"
              }`}
          >
            <span className="text-[#a9a9a9] font-semibold">SETTINGS</span>
          </Link>

          {session.data?.user ?
            <span
              className={`text-sm tracking-wide ${theme === "dark" ? "text-white/90" : "text-black/90"
                }`}
            >
              <span onClick={() => signOut()} className="text-[#a9a9a9] font-semibold cursor-pointer">SIGN OUT </span>
            </span> :
            <span
              className={`text-sm tracking-wide ${theme === "dark" ? "text-white/90" : "text-black/90"
                }`}
            >
              <span onClick={() => signIn()} className="text-[#a9a9a9] font-semibold cursor-pointer">SIGN IN</span>
            </span>
          }
        </div>
      </nav>
    </div>
  )
}