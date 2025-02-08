import Logo from "./icons/logo"

interface FooterProps {
  theme: "light" | "dark"
  toggleTheme: () => void
}

export function Footer({ theme, toggleTheme }: FooterProps) {
  return (
    <footer className="flex items-center justify-normal py-12">
      <div className={`absolute left-10 bottom-0 ${theme === "dark" ? "text-gray-500" : "text-gray-600"
        }`}>
        <Logo />
      </div>
      <div
        onClick={toggleTheme}
        className={`fixed bottom-0 right-7 rounded-t-[7px] rounded-b-none px-2 p-1 text-xs font-bold cursor-pointer ${theme === "light"
          ? "bg-black text-white hover:bg-black/80"
          : "bg-white text-black hover:bg-white/80"
          }`}
      >
        {theme === "light" ? "DARK" : "LIGHT"}
      </div>


    </footer>
  )
}