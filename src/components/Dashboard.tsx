"use client"

import { Navbar } from "@/components/Navbar"
import { useState, useEffect } from "react"
import { MainContent } from "./Main"
import { Footer } from "./footer"

export default function Dashboard() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark")
    document.documentElement.classList.add(theme)
  }, [theme])

  return (
    <div className={`min-h-screen transition-colors duration-300  ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }`}>
      <Navbar theme={theme} />
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        <MainContent theme={theme} />
        <Footer theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  )
}