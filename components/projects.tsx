"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Code, Folder, Star, ArrowRight, Github, Zap, Rocket } from "lucide-react"
import { Loading } from "@/components/loading"
import { GoogleDriveImage } from "@/components/ui/google-drive-image"

interface ProjectData {
  ID_project: string
  Nama_Proyek: string
  Deskripsi: string
  Skill: string
  Link: string
  Gambar_Proyek_URL: string
}

export function Projects() {
  const [projects, setProjects] = useState<ProjectData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwMFzmXiZcFPGD-7T9ed9WGTOPr6wjjFIE0Oqw4X-FEfxvTpPsfFEtR0FHbUhR2rqk-PA/exec?sheet=Project&action=read",
      )
      const data = await response.json()

      if (data && data.length > 1) {
        const projectList = data.slice(1).map((row: any[]) => ({
          ID_project: row[0] || "",
          Nama_Proyek: row[1] || "",
          Deskripsi: row[2] || "",
          Skill: row[3] || "",
          Link: row[4] || "",
          Gambar_Proyek_URL: row[5] || "",
        }))
        setProjects(projectList)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading icon={Rocket} title="Loading Projects" subtitle="Gathering amazing work..." />
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-32 w-24 h-24 border border-gray-800 rotate-12 animate-spin-slow opacity-20" />
        <div className="absolute bottom-40 right-20 w-32 h-32 border border-gray-700 rounded-full animate-pulse opacity-10" />
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white/5 rotate-45 animate-bounce" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-1 bg-white" />
            <Rocket className="w-8 h-8 text-white animate-pulse" />
            <div className="w-16 h-1 bg-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">My Projects</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A collection of projects that showcase my skills and passion for development
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-900 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-gray-800 rotate-45">
              <Folder className="w-12 h-12 text-gray-500 -rotate-45" />
            </div>
            <p className="text-gray-400 text-lg">No project data found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.ID_project || index}
                className="group relative overflow-hidden bg-gray-900/30 backdrop-blur-xl border border-gray-800 hover:border-gray-600 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-rotate-1"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "slideInUp 0.8s ease-out both",
                }}
              >
                {/* Geometric background elements */}
                <div className="absolute top-0 right-0 w-24 h-24 border border-gray-800 rotate-45 translate-x-12 -translate-y-12 group-hover:rotate-90 transition-transform duration-700 opacity-20" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full -translate-x-10 translate-y-10 group-hover:scale-150 transition-transform duration-700" />

                {/* Project Image */}
                <div className="relative aspect-video bg-gray-800 overflow-hidden">
                  {project.Gambar_Proyek_URL ? (
                    <GoogleDriveImage
                      url={project.Gambar_Proyek_URL}
                      alt={project.Nama_Proyek}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <div className="text-center">
                        <Code className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                        <p className="text-gray-400 text-sm">Project Image</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                      <Github className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                <CardHeader className="relative">
                  <CardTitle className="flex items-start gap-3 text-white group-hover:text-gray-200 transition-colors">
                    <div className="relative flex-shrink-0">
                      <div className="p-3 bg-white text-black rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                        <Code className="h-4 w-4" />
                      </div>
                      <div
                        className="absolute inset-0 p-3 bg-gray-400 text-black rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 -z-10"
                        style={{ transform: "translate(3px, 3px)" }}
                      />
                    </div>
                    <span className="flex-1 leading-tight font-bold text-lg">{project.Nama_Proyek}</span>
                  </CardTitle>

                  {/* Skills badges */}
                  {project.Skill && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.Skill.split(",").map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          className="text-xs bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:text-white transition-colors backdrop-blur-sm px-2 py-1"
                        >
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>

                <CardContent className="relative space-y-6">
                  <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                    {project.Deskripsi}
                  </p>

                  {project.Link && (
                    <Button
                      asChild
                      className="w-full bg-white text-black hover:bg-gray-200 transition-all duration-300 group/btn font-semibold py-3 rounded-xl"
                    >
                      <a
                        href={project.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                        View Project
                        <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </a>
                    </Button>
                  )}
                </CardContent>

                {/* Floating elements */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                  <Star className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                  <Zap className="w-4 h-4 text-gray-400 animate-bounce" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
