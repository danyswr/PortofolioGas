"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loading } from "@/components/loading"
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Download,
  User,
  ArrowRight,
  Star,
  Sparkles,
  Globe,
  Code2,
  Heart,
  Play,
  Award,
  Briefcase,
  FolderOpen,
  Coffee,
  Rocket,
  Target,
} from "lucide-react"

interface ProfileData {
  nama_lengkap: string
  profesi: string
  Deskripsi: string
  Foto_Profil_URL: string
  Email: string
  Nomor_Telepon: string
  Lokasi: string
  Link_LinkedIn: string
  Link_GitHub: string
}

export function Home() {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  useEffect(() => {
    fetchProfile()

    // Auto-rotate active section
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwMFzmXiZcFPGD-7T9ed9WGTOPr6wjjFIE0Oqw4X-FEfxvTpPsfFEtR0FHbUhR2rqk-PA/exec?sheet=Profile&action=read",
      )
      const data = await response.json()

      if (data && data.length > 1) {
        const profileRow = data[1]
        setProfile({
          nama_lengkap: profileRow[0] || "",
          profesi: profileRow[1] || "",
          Deskripsi: profileRow[2] || "",
          Foto_Profil_URL: profileRow[3] || "",
          Email: profileRow[4] || "",
          Nomor_Telepon: profileRow[5] || "",
          Lokasi: profileRow[6] || "",
          Link_LinkedIn: profileRow[7] || "",
          Link_GitHub: profileRow[8] || "",
        })
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading icon={Rocket} title="Loading Portfolio" subtitle="Preparing something amazing..." />
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-32 h-32 bg-gray-900 rounded-2xl mx-auto mb-8 flex items-center justify-center border-2 border-gray-800 rotate-12">
            <User className="w-16 h-16 text-gray-500 -rotate-12" />
          </div>
          <h3 className="text-white text-2xl font-bold mb-2">No Profile Found</h3>
          <p className="text-gray-400 text-lg">Please check your data source.</p>
        </div>
      </div>
    )
  }

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: profile.Email,
      href: `mailto:${profile.Email}`,
      color: "from-gray-600 to-gray-800",
      description: "Drop me a line",
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile.Nomor_Telepon,
      href: `tel:${profile.Nomor_Telepon}`,
      color: "from-gray-700 to-gray-900",
      description: "Let's have a chat",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.Lokasi,
      href: `https://maps.google.com/?q=${encodeURIComponent(profile.Lokasi)}`,
      color: "from-gray-800 to-black",
      description: "Find me here",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Connect with me",
      href: profile.Link_LinkedIn,
      color: "from-gray-600 to-gray-800",
      description: "Professional network",
    },
    {
      icon: Github,
      label: "GitHub",
      value: "View my code",
      href: profile.Link_GitHub,
      color: "from-gray-700 to-gray-900",
      description: "Code repository",
    },
  ].filter((item) => item.value && item.href)

  const highlights = [
    { icon: Award, title: "Certifications", count: "15+", color: "text-yellow-400" },
    { icon: Briefcase, title: "Experience", count: "5+ Years", color: "text-blue-400" },
    { icon: FolderOpen, title: "Projects", count: "50+", color: "text-green-400" },
    { icon: Coffee, title: "Coffee Cups", count: "∞", color: "text-orange-400" },
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic Background Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-ping opacity-40" />
        <div className="absolute top-40 right-32 w-3 h-3 border border-gray-500 rotate-45 animate-spin-slow opacity-30" />
        <div className="absolute bottom-32 left-1/4 w-4 h-4 border border-gray-400 rounded-full animate-pulse opacity-25" />
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-gray-300 rotate-45 animate-bounce opacity-50" />
        <div className="absolute top-1/2 left-10 w-3 h-3 border border-gray-500 animate-spin opacity-20" />
        <div className="absolute top-1/3 right-10 w-5 h-5 bg-white/5 rounded-full animate-float opacity-40" />
      </div>

      <div className="relative z-10 pt-32">
        {/* Hero Section - Magazine Style Layout */}
        <div className="min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Hero Grid */}
            <div className="grid lg:grid-cols-12 gap-8 mb-16">
              {/* Left Column - Profile & Info */}
              <div className="lg:col-span-5 space-y-8">
                {/* Profile Card */}
                <Card className="relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
                  <CardContent className="relative p-8">
                    {/* Profile Image */}
                    <div className="relative mb-6 flex justify-center">
                      <div className="relative group">
                        <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-gray-400/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500" />
                        {profile.Foto_Profil_URL ? (
                          <img
                            src={profile.Foto_Profil_URL || "/placeholder.svg"}
                            alt={profile.nama_lengkap}
                            className={`relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-2xl transition-all duration-700 group-hover:scale-110 ${
                              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
                            }`}
                            onLoad={() => setImageLoaded(true)}
                          />
                        ) : (
                          <div className="relative w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-4 border-white shadow-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                            <span className="text-4xl font-bold text-white">{profile.nama_lengkap.charAt(0)}</span>
                          </div>
                        )}

                        {/* Status Indicator */}
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center animate-pulse">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Name & Title */}
                    <div className="text-center mb-6">
                      <h1 className="text-3xl font-bold text-white mb-2">{profile.nama_lengkap}</h1>
                      <Badge className="px-4 py-2 bg-white/10 text-white border border-white/20 backdrop-blur-sm">
                        <Globe className="w-4 h-4 mr-2" />
                        {profile.profesi}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-center leading-relaxed mb-6">{profile.Deskripsi}</p>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-white text-black hover:bg-gray-200 font-semibold group">
                        <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                        Download CV
                      </Button>
                      
                    </div>
                  </CardContent>
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {highlights.map((item, index) => {
                    const Icon = item.icon
                    return (
                      <Card
                        key={index}
                        className={`relative overflow-hidden bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300 hover:scale-105 ${
                          activeSection === index ? "ring-2 ring-white/20" : ""
                        }`}
                      >
                        <CardContent className="p-6 text-center">
                          <Icon className={`w-8 h-8 mx-auto mb-3 ${item.color}`} />
                          <div className="text-2xl font-bold text-white mb-1">{item.count}</div>
                          <div className="text-gray-400 text-sm">{item.title}</div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Right Column - Large Feature */}
              <div className="lg:col-span-7">
                <Card className="h-full relative overflow-hidden bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />

                  {/* Decorative Elements */}
                  <div className="absolute top-8 right-8 w-20 h-20 border border-gray-600/30 rounded-full animate-spin-slow" />
                  <div className="absolute bottom-8 left-8 w-16 h-16 bg-white/5 rotate-45" />

                  <CardContent className="relative p-12 h-full flex flex-col justify-center">
                    <div className="space-y-8">
                      {/* Large Title */}
                      <div>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-16 h-1 bg-white" />
                          <Sparkles className="w-6 h-6 text-white animate-pulse" />
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                          Let's Build
                          <span className="block text-transparent bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text">
                            Something
                          </span>
                          <span className="block">Amazing</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-lg">
                          Ready to turn your ideas into reality? I'm here to help you create digital experiences that
                          matter.
                        </p>
                      </div>

                      {/* Feature List */}
                      <div className="space-y-4">
                        {[
                          { icon: Target, text: "Strategic Planning & Consultation" },
                          { icon: Code2, text: "Full-Stack Development" },
                          { icon: Rocket, text: "Performance Optimization" },
                        ].map((feature, index) => {
                          const Icon = feature.icon
                          return (
                            <div key={index} className="flex items-center gap-4 group">
                              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                              <span className="text-gray-300 group-hover:text-white transition-colors">
                                {feature.text}
                              </span>
                            </div>
                          )
                        })}
                      </div>

                      {/* CTA */}
                      <Button className="w-fit bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:scale-105 transition-all duration-300 group">
                        <Heart className="w-5 h-5 mr-3 group-hover:fill-current transition-all" />
                        Let's Connect
                        <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Section - Masonry Style */}
            <div className="mb-16">
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-white mb-4">Get In Touch</h3>
                <p className="text-gray-400 text-lg">Choose your preferred way to connect</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {contactItems.map((item, index) => {
                  const Icon = item.icon
                  return (
                    <Card
                      key={index}
                      className="group relative overflow-hidden bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl border border-gray-700/50 hover:border-gray-500/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "slideInUp 0.6s ease-out both",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Floating Particles */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <CardContent className="relative p-8">
                        <a
                          href={item.href}
                          target={item.label === "Email" || item.label === "Phone" ? "_self" : "_blank"}
                          rel={item.label === "Email" || item.label === "Phone" ? "" : "noopener noreferrer"}
                          className="block space-y-6"
                        >
                          {/* Icon */}
                          <div className="relative">
                            <div className="w-16 h-16 bg-white text-black rounded-2xl shadow-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                              <Icon className="w-8 h-8" />
                            </div>
                            <div
                              className="absolute inset-0 w-16 h-16 bg-gray-400 rounded-2xl shadow-xl -z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                              style={{ transform: "translate(4px, 4px)" }}
                            />
                          </div>

                          {/* Content */}
                          <div className="space-y-2">
                            <h4 className="text-xl font-bold text-white group-hover:text-gray-200 transition-colors">
                              {item.label}
                            </h4>
                            <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">
                              {item.description}
                            </p>
                            <p className="text-gray-300 group-hover:text-gray-200 transition-colors font-medium">
                              {item.value}
                            </p>
                          </div>

                          {/* Arrow */}
                          <div className="flex justify-end">
                            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-2 transition-all duration-300" />
                          </div>
                        </a>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="text-center pb-16">
              <div className="relative inline-block group">
                <div className="absolute inset-0 bg-white/10 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-2xl border border-gray-700/50 rounded-full px-12 py-6 shadow-2xl group-hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <Star className="w-8 h-8 text-white animate-pulse" />
                    <span className="text-2xl font-bold text-white">Ready to start your next project?</span>
                    <Star className="w-8 h-8 text-white animate-pulse" style={{ animationDelay: "0.5s" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
