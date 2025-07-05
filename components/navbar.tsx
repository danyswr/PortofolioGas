"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Home, Briefcase, Award, FolderOpen } from "lucide-react"
import { usePathname } from "next/navigation"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname()

  const getActiveItem = () => {
    if (pathname === "/") return "Home"
    if (pathname === "/experience") return "Experience"
    if (pathname === "/certifications") return "Certifications"
    if (pathname === "/projects") return "Projects"
    return "Home"
  }

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Experience", href: "/experience", icon: Briefcase },
    { name: "Certifications", href: "/certifications", icon: Award },
    { name: "Projects", href: "/projects", icon: FolderOpen },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Floating Dock Navigation */}
      <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "bg-black/90 backdrop-blur-2xl border border-gray-800/50 shadow-2xl"
              : "bg-black/70 backdrop-blur-xl border border-gray-700/30"
          } rounded-full px-2 py-2`}
        >
          {/* Desktop Navigation - Dock Style */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = getActiveItem() === item.name

              return (
                <Link key={item.name} href={item.href} className="group relative">
                  <div
                    className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-white text-black scale-110 shadow-lg"
                        : "text-gray-400 hover:text-white hover:bg-white/10 hover:scale-105"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-white text-black px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap shadow-lg">
                      {item.name}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center justify-between px-3 py-2">
            <div className="text-white font-bold text-lg">Portfolio</div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute block w-5 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? "rotate-45 top-2" : "top-1"
                  }`}
                />
                <span
                  className={`absolute block w-5 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? "opacity-0" : "top-2"
                  }`}
                />
                <span
                  className={`absolute block w-5 h-0.5 bg-white transition-all duration-300 ${
                    isOpen ? "-rotate-45 top-2" : "top-3"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden mt-4 transition-all duration-500 ${
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="bg-black/95 backdrop-blur-2xl border border-gray-800/50 rounded-2xl p-6 shadow-2xl">
            <div className="space-y-4">
              {navItems.map((item, index) => {
                const Icon = item.icon
                const isActive = getActiveItem() === item.name

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive ? "bg-white text-black" : "text-gray-300 hover:text-white hover:bg-white/10"
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isOpen ? `slideInLeft 0.5s ease-out ${index * 100}ms both` : "none",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
