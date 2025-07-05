"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase, Clock, ArrowRight, Zap, Target, Building, Users, TrendingUp } from "lucide-react"
import { Loading } from "@/components/loading"

interface ExperienceData {
  ID_pengalaman: string
  Posisi: string
  Tanggal_Mulai: string
  Tanggal_Selesai: string
  Deskripsi: string
}

export function Experience() {
  const [experiences, setExperiences] = useState<ExperienceData[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    fetchExperiences()
  }, [])

  useEffect(() => {
    if (experiences.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % experiences.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [experiences.length])

  const fetchExperiences = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwMFzmXiZcFPGD-7T9ed9WGTOPr6wjjFIE0Oqw4X-FEfxvTpPsfFEtR0FHbUhR2rqk-PA/exec?sheet=Experience&action=read",
      )
      const data = await response.json()

      if (data && data.length > 1) {
        const experienceList = data.slice(1).map((row: any[]) => ({
          ID_pengalaman: row[0] || "",
          Posisi: row[1] || "",
          Tanggal_Mulai: row[2] || "",
          Tanggal_Selesai: row[3] || "",
          Deskripsi: row[4] || "",
        }))
        setExperiences(experienceList)
      }
    } catch (error) {
      console.error("Error fetching experiences:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading icon={Briefcase} title="Loading Experience" subtitle="Gathering professional journey..." />
  }

  return (
    <div className="min-h-screen bg-black pt-24 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] animate-pulse" />

        {/* Floating Geometric Elements */}
        <div className="absolute top-32 left-20 w-24 h-24 border border-gray-800 rotate-45 animate-spin-slow opacity-20" />
        <div className="absolute bottom-40 right-32 w-32 h-32 border border-gray-700 rounded-full animate-pulse opacity-10" />
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-white/5 rotate-12 animate-bounce" />
        <div className="absolute top-1/3 right-20 w-20 h-20 border-2 border-gray-600 rotate-12 animate-spin-slow opacity-15" />
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-gradient-to-r from-white/10 to-transparent rounded-full animate-float" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-white/5 rounded-full blur-3xl" />
            <div className="relative flex items-center justify-center gap-6 px-8 py-4">
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="relative">
                <Zap className="w-10 h-10 text-white animate-pulse" />
                <div className="absolute inset-0 w-10 h-10 border-2 border-white/30 rounded-full animate-ping" />
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tight">
            <span className="block">Professional</span>
            <span className="block text-transparent bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 bg-clip-text">
              Journey
            </span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Discover the milestones and achievements that shaped my career path
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl mx-auto flex items-center justify-center border border-gray-700 rotate-12 shadow-2xl">
                <Briefcase className="w-16 h-16 text-gray-500 -rotate-12" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500/20 rounded-full border-2 border-red-500 animate-pulse" />
            </div>
            <h3 className="text-white text-3xl font-bold mb-4">No Experience Found</h3>
            <p className="text-gray-400 text-xl">Experience data will appear here once available.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {/* Timeline Navigation */}
            <div className="flex justify-center mb-16">
              <div className="flex items-center gap-4 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-full px-6 py-3">
                {experiences.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      activeIndex === index
                        ? "bg-white scale-125 shadow-lg"
                        : "bg-gray-600 hover:bg-gray-500 hover:scale-110"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-white via-gray-400 to-gray-800 hidden lg:block" />

              <div className="space-y-16">
                {experiences.map((exp, index) => {
                  const isLeft = index % 2 === 0
                  const isActive = activeIndex === index

                  return (
                    <div
                      key={exp.ID_pengalaman || index}
                      className={`relative group ${isActive ? "z-10" : "z-0"}`}
                      style={{
                        animationDelay: `${index * 200}ms`,
                        animation: "slideInUp 0.8s ease-out both",
                      }}
                    >
                      {/* Timeline Node - Perfectly Centered */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 top-8 hidden lg:block z-20">
                        <div className={`relative transition-all duration-500 ${isActive ? "scale-125" : "scale-100"}`}>
                          <div
                            className={`w-4 h-4 rounded-full border-4 transition-all duration-300 ${
                              isActive
                                ? "bg-white border-white shadow-lg"
                                : "bg-gray-800 border-gray-600 group-hover:border-gray-400"
                            }`}
                          />
                          {isActive && (
                            <div className="absolute inset-0 w-4 h-4 rounded-full bg-white animate-ping opacity-40" />
                          )}
                        </div>
                      </div>

                      {/* Experience Card - Improved Structure */}
                      <div className={`lg:w-1/2 ${isLeft ? "lg:pr-12" : "lg:pl-12 lg:ml-auto"}`}>
                        <Card
                          className={`relative overflow-hidden transition-all duration-500 ${
                            isActive
                              ? "bg-gradient-to-br from-gray-900/90 to-gray-800/70 border-gray-600/60 shadow-2xl scale-[1.02]"
                              : "bg-gray-900/50 border-gray-700/50 hover:border-gray-600/60 hover:bg-gray-900/70"
                          } backdrop-blur-xl shadow-xl hover:scale-[1.01]`}
                        >
                          {/* Card Header */}
                          <div className="p-6 border-b border-gray-700/50">
                            <div className="flex items-start justify-between gap-4">
                              {/* Left Side - Icon & Title */}
                              <div className="flex items-start gap-4 flex-1">
                                <div className="relative flex-shrink-0">
                                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Building className="w-6 h-6 text-black" />
                                  </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{exp.Posisi}</h3>
                                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Users className="w-4 h-4 flex-shrink-0" />
                                    <span>Professional Role</span>
                                  </div>
                                </div>
                              </div>

                              {/* Right Side - Date Badge */}
                              <Badge className="flex items-center gap-2 px-3 py-1.5 bg-white/10 text-white border-white/20 backdrop-blur-sm flex-shrink-0">
                                <Calendar className="h-3 w-3" />
                                <span className="font-medium text-xs whitespace-nowrap">
                                  {exp.Tanggal_Mulai} - {exp.Tanggal_Selesai}
                                </span>
                              </Badge>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="p-6">
                            <div className="flex items-start gap-3">
                              <Target className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                              <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                                {exp.Deskripsi}
                              </p>
                            </div>
                          </div>

                          {/* Card Footer */}
                          <div className="px-6 py-4 bg-gray-800/30 border-t border-gray-700/50">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-500 text-sm">Experience #{index + 1}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-300" />
                              </div>
                            </div>
                          </div>

                          {/* Active Indicator */}
                          {isActive && (
                            <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          )}
                        </Card>
                      </div>

                      {/* Mobile Timeline Connector */}
                      <div className="lg:hidden flex justify-center mt-8">
                        {index < experiences.length - 1 && (
                          <div className="w-0.5 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Bottom Stats */}
            <div className="mt-20 text-center">
              <div className="inline-flex items-center gap-8 bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-full px-8 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white font-medium">{experiences.length} Positions</span>
                </div>
                <div className="w-px h-6 bg-gray-600" />
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">Professional Journey</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
