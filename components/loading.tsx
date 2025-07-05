import type { LucideIcon } from "lucide-react"

interface LoadingProps {
  icon: LucideIcon
  title: string
  subtitle: string
}

export function Loading({ icon: Icon, title, subtitle }: LoadingProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Perfectly Centered Loading Animation */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          {/* Outer Ring */}
          <div
            className="absolute inset-0 border-2 border-gray-800 rounded-full animate-spin"
            style={{ animationDuration: "3s" }}
          />

          {/* Second Ring */}
          <div
            className="absolute inset-2 border-2 border-gray-700 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "2.5s" }}
          />

          {/* Third Ring */}
          <div
            className="absolute inset-4 border-2 border-gray-600 rounded-full animate-spin"
            style={{ animationDuration: "2s" }}
          />

          {/* Fourth Ring */}
          <div
            className="absolute inset-6 border-2 border-gray-500 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          />

          {/* Inner Ring */}
          <div
            className="absolute inset-8 border-2 border-white rounded-full animate-spin"
            style={{ animationDuration: "1s" }}
          />

          {/* Center Icon */}
          <div className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 text-black" />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-4">
          <h3 className="text-white font-bold text-2xl">{title}</h3>
          <p className="text-gray-400 text-lg">{subtitle}</p>

          {/* Perfectly Centered Dots */}
          <div className="flex justify-center items-center gap-2 pt-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 bg-white rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
