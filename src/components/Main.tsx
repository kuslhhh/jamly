import { Gabarito } from "next/font/google"

const font = Gabarito({
    subsets: ['latin'],
    weight: "900"
})

interface MainContentProps {
    theme: "dark" | "light"
}


export function MainContent({ theme }: MainContentProps) {
    return (
        <main className="flex flex-1 flex-col items-center justify-center px-4 text-center min-h-[80vh]">
            <h1 className={`mb-6 text-8xl font-bold tracking-normal ${theme === "dark" ? "text-[#a9a9a9]    " : "text-[#1a1a1a]"} ${font.className}`}>JAMLY</h1>
            <p className={`max-w-2xl text-lg ${theme === "dark" ? "text-[#a9a9a9]   " : "text-[#1a1a1a]"} ${font.className}`}>
                Your vote shapes the playlist
            </p>
        </main>
    )
}  