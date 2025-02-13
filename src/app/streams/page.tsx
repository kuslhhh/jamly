"use client"

import { useState, useEffect } from "react"
import { Search, Play, Pause, SkipForward, SkipBack, Share2, ThumbsUp, ThumbsDown, Music } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Song {
  id: string
  title: string
  artist: string
  votes: number
  duration: string
  thumbnail: string
}

const mockSongs: Song[] = [
  {
    id: "1",
    title: "Neon Nights",
    artist: "Digital Dreams",
    votes: 45,
    duration: "3:24",
    thumbnail: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    title: "Cyber Soul",
    artist: "Electronic Minds",
    votes: 32,
    duration: "4:15",
    thumbnail: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    title: "Future Funk",
    artist: "Synthwave Collective",
    votes: 28,
    duration: "3:58",
    thumbnail: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    title: "Digital Love",
    artist: "Virtual Hearts",
    votes: 23,
    duration: "3:45",
    thumbnail: "/placeholder.svg?height=40&width=40",
  },
]

export default function StreamsPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong] = useState<Song>(mockSongs[0])
  const [votes, setVotes] = useState<Record<string, number>>(
    Object.fromEntries(mockSongs.map((song) => [song.id, song.votes])),
  )
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const handleVote = (songId: string, value: number) => {
    setVotes((prev) => ({
      ...prev,
      [songId]: (prev[songId] || 0) + value,
    }))
  }

  return (
    <div className="h-screen bg-black text-gray-200 flex flex-col">
      {/* Search Header */}
      <div className="border-b border-emerald-400/10 bg-black/50 backdrop-blur-sm p-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-emerald-400/50 h-4 w-4" />
            <Input
              className="pl-8 bg-transparent border-emerald-400/20 focus:border-emerald-400/50 rounded-full text-sm h-8"
              placeholder="What do you want to play next?"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10 rounded-full"
          >
            Rooms
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Player Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="aspect-square relative group w-full max-w-md mx-auto">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Album Art"
              width={400}
              height={400}
              className="w-full rounded-lg border border-emerald-400/20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            <button
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-16 w-16 text-emerald-400" />
              ) : (
                <Play className="h-16 w-16 text-emerald-400" />
              )}
            </button>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-emerald-400">{currentSong.title}</h2>
                <p className="text-sm text-gray-400">{currentSong.artist}</p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10 rounded-full"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress & Controls */}
            <div className="space-y-2">
              <div className="h-1 bg-emerald-400/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400/50 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-emerald-400/50 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-full"
                >
                  <SkipBack className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  className="h-12 w-12 rounded-full border-2 border-emerald-400 bg-transparent text-emerald-400 hover:bg-emerald-400/10"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-emerald-400/50 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-full"
                >
                  <SkipForward className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Queue Section */}
        <div className="w-80 border-l border-emerald-400/10 p-4 flex flex-col">
          <h2 className="text-lg font-semibold text-emerald-400 mb-4">Queue (12)</h2>

          <div className="flex-1 space-y-2 overflow-y-auto">
            {mockSongs.map((song) => (
              <div
                key={song.id}
                className="group border border-emerald-400/20 hover:bg-emerald-400/5 transition-colors rounded-lg overflow-hidden"
              >
                <div className="p-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-400/10 rounded-full flex items-center justify-center text-emerald-400">
                    <Music className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate text-sm">{song.title}</h3>
                    <p className="text-xs text-gray-400 truncate">{song.artist}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-emerald-400/70 hover:text-emerald-400 hover:bg-emerald-400/10"
                      onClick={() => handleVote(song.id, 1)}
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    <span className="min-w-[2ch] text-center text-xs">{votes[song.id]}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-emerald-400/70 hover:text-emerald-400 hover:bg-emerald-400/10"
                      onClick={() => handleVote(song.id, -1)}
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                {/* Progress indicator */}
                <div className="h-0.5 bg-emerald-400/10">
                  <div className="h-full bg-emerald-400/30" style={{ width: `${Math.random() * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2">
            <Button size="sm" className="w-full bg-emerald-400 text-black hover:bg-emerald-400/90">
              Invite Friends
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10"
            >
              Share Stream
            </Button>
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-black">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-400/10 via-transparent to-transparent opacity-20" />
      </div>
    </div>
  )
}

