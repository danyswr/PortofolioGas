"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Award, Star, ExternalLink, Zap, Shield, ChevronLeft, ChevronRight, X, Eye } from "lucide-react"
import { Loading } from "@/components/loading"
import { GoogleDriveImage } from "@/components/ui/google-drive-image"

interface CertificationData {
  ID_Sertifikasi: string
  Nama_Sertifikasi: string
  Tanggal_Diterbitkan: string
  Gambar_Sertifikasi_URL: string
  Deskripsi: string
}

export function Certifications() {
  const [certifications, setCertifications] = useState<CertificationData[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [selectedCert, setSelectedCert] = useState<CertificationData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchCertifications()
  }, [])

  // Auto-slide functionality
  useEffect(() => {
    if (certifications.length > 0 && isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % certifications.length)
      }, 4000) // Slide every 4 seconds
      return () => clearInterval(interval)
    }
  }, [certifications.length, isAutoPlaying])

  const fetchCertifications = async () => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwMFzmXiZcFPGD-7T9ed9WGTOPr6wjjFIE0Oqw4X-FEfxvTpPsfFEtR0FHbUhR2rqk-PA/exec?sheet=Certifications&action=read",
      )
      const data = await response.json()

      if (data && data.length > 1) {
        const certificationList = data.slice(1).map((row: any[]) => ({
          ID_Sertifikasi: row[0] || "",
          Nama_Sertifikasi: row[1] || "",
          Tanggal_Diterbitkan: row[2] || "",
          Gambar_Sertifikasi_URL: row[3] || "",
          Deskripsi: row[4] || "",
        }))
        setCertifications(certificationList)
      }
    } catch (error) {
      console.error("Error fetching certifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % certifications.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + certifications.length) % certifications.length)
  }

  const openModal = (cert: CertificationData) => {
    setSelectedCert(cert)
    setIsModalOpen(true)
    setIsAutoPlaying(false) // Pause carousel when modal opens
  }

  const closeModal = () => {
    setSelectedCert(null)
    setIsModalOpen(false)
    setIsAutoPlaying(true) // Resume carousel when modal closes
  }

  if (loading) {
    return <Loading icon={Award} title="Loading Certifications" subtitle="Gathering achievements..." />
  }

  return (
    <div className="min-h-screen bg-black pt-24">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-20 w-28 h-28 border border-gray-800 rotate-12 animate-spin-slow opacity-20" />
        <div className="absolute bottom-32 left-32 w-20 h-20 border border-gray-700 rounded-full animate-pulse opacity-15" />
        <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/5 rotate-45 animate-bounce" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-1 bg-white" />
            <Shield className="w-8 h-8 text-white animate-pulse" />
            <div className="w-16 h-1 bg-white" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Certifications</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional certifications and achievements that validate my expertise
          </p>
        </div>

        {certifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-900 rounded-2xl mx-auto mb-6 flex items-center justify-center border border-gray-800 rotate-45">
              <Award className="w-12 h-12 text-gray-500 -rotate-45" />
            </div>
            <p className="text-gray-400 text-lg">No certification data found.</p>
          </div>
        ) : (
          <>
            {/* Featured Certification Carousel */}
            <div className="mb-20">
              <div className="relative group">
                {/* Main Carousel Container */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
                  {/* Carousel Content */}
                  <div className="relative h-96 md:h-[500px]">
                    {certifications.map((cert, index) => (
                      <div
                        key={cert.ID_Sertifikasi || index}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          index === currentSlide
                            ? "opacity-100 translate-x-0 scale-100"
                            : index < currentSlide
                              ? "opacity-0 -translate-x-full scale-95"
                              : "opacity-0 translate-x-full scale-95"
                        }`}
                      >
                        <div className="grid md:grid-cols-2 h-full">
                          {/* Left Side - Image */}
                          <div className="relative overflow-hidden bg-gray-800">
                            {cert.Gambar_Sertifikasi_URL ? (
                              <GoogleDriveImage
                                url={cert.Gambar_Sertifikasi_URL}
                                alt={cert.Nama_Sertifikasi}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                                <Award className="w-24 h-24 text-gray-500" />
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/30" />
                          </div>

                          {/* Right Side - Content */}
                          <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="space-y-6">
                              {/* Badge */}
                              <Badge className="w-fit bg-white/10 text-white border-white/20 px-4 py-2 backdrop-blur-sm">
                                <Star className="w-4 h-4 mr-2" />
                                Featured Certificate
                              </Badge>

                              {/* Title */}
                              <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                                {cert.Nama_Sertifikasi}
                              </h3>

                              {/* Date */}
                              <div className="flex items-center gap-3 text-gray-300">
                                <Calendar className="w-5 h-5" />
                                <span className="text-lg font-medium">{cert.Tanggal_Diterbitkan}</span>
                              </div>

                              {/* Description */}
                              <p className="text-gray-300 text-lg leading-relaxed">{cert.Deskripsi}</p>

                              {/* Action Buttons */}
                              <div className="flex gap-4">
                                <Button
                                  onClick={() => openModal(cert)}
                                  className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl font-semibold group/btn"
                                >
                                  <Eye className="w-5 h-5 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
                                  View Details
                                </Button>
                                <Button
                                  variant="outline"
                                  className="border-white/30 text-white hover:bg-white hover:text-black bg-transparent px-6 py-3 rounded-xl font-semibold"
                                >
                                  <ExternalLink className="w-5 h-5 mr-2" />
                                  Certificate
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="absolute inset-y-0 left-4 flex items-center">
                    <Button
                      onClick={prevSlide}
                      className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 hover:bg-black/70 hover:border-white/40 hover:scale-110 transition-all duration-300 group/nav shadow-2xl"
                    >
                      <ChevronLeft className="w-6 h-6 text-white group-hover/nav:scale-125 transition-transform duration-300" />
                    </Button>
                  </div>

                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <Button
                      onClick={nextSlide}
                      className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 hover:bg-black/70 hover:border-white/40 hover:scale-110 transition-all duration-300 group/nav shadow-2xl"
                    >
                      <ChevronRight className="w-6 h-6 text-white group-hover/nav:scale-125 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-white/20 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-white/10 rounded-full animate-bounce" />
              </div>
            </div>

            {/* All Certifications Grid */}
            <div>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">All Certifications</h2>
                <p className="text-gray-400 text-lg">Complete collection of my professional achievements</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certifications.map((cert, index) => (
                  <Card
                    key={cert.ID_Sertifikasi || index}
                    onClick={() => openModal(cert)}
                    className="group relative overflow-hidden bg-gray-900/30 backdrop-blur-xl border border-gray-800 hover:border-gray-600 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:rotate-1 cursor-pointer"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: "slideInUp 0.8s ease-out both",
                    }}
                  >
                    {/* Geometric background elements */}
                    <div className="absolute top-0 right-0 w-20 h-20 border border-gray-800 rotate-45 translate-x-10 -translate-y-10 group-hover:rotate-90 transition-transform duration-500 opacity-30" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full -translate-x-8 translate-y-8 group-hover:scale-150 transition-transform duration-500" />

                    {/* Certificate Image */}
                    {cert.Gambar_Sertifikasi_URL && (
                      <div className="relative aspect-video bg-gray-800 overflow-hidden">
                        <GoogleDriveImage
                          url={cert.Gambar_Sertifikasi_URL}
                          alt={cert.Nama_Sertifikasi}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="p-2 bg-white/20 backdrop-blur-sm rounded-full">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    )}

                    <CardHeader className="relative">
                      <CardTitle className="flex items-start gap-3 text-white group-hover:text-gray-200 transition-colors">
                        <div className="relative flex-shrink-0">
                          <div className="p-3 bg-white text-black rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                            <Award className="h-5 w-5" />
                          </div>
                          <div
                            className="absolute inset-0 p-3 bg-gray-400 text-black rounded-2xl shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 -z-10"
                            style={{ transform: "translate(3px, 3px)" }}
                          />
                        </div>
                        <span className="flex-1 leading-tight font-bold text-lg">{cert.Nama_Sertifikasi}</span>
                      </CardTitle>

                      <Badge className="flex items-center gap-2 w-fit mt-4 bg-white/10 text-white border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm px-3 py-2">
                        <Calendar className="h-3 w-3" />
                        <span className="font-medium">{cert.Tanggal_Diterbitkan}</span>
                      </Badge>
                    </CardHeader>

                    <CardContent className="relative">
                      <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors line-clamp-3">
                        {cert.Deskripsi}
                      </p>

                      {/* View More Indicator */}
                      <div className="mt-4 flex items-center gap-2 text-gray-400 group-hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm font-medium">Click to view details</span>
                      </div>
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
            </div>
          </>
        )}
      </div>

      {/* Certificate Detail Modal */}
      {isModalOpen && selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-lg" onClick={closeModal} />

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl">
            {/* Close Button */}
            <Button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 hover:bg-black/70 hover:border-white/40 hover:scale-110 transition-all duration-300"
            >
              <X className="w-6 h-6 text-white" />
            </Button>

            <div className="grid md:grid-cols-2 gap-8 p-8">
              {/* Left Side - Image */}
              <div className="relative">
                <div className="aspect-video bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                  {selectedCert.Gambar_Sertifikasi_URL ? (
                    <GoogleDriveImage
                      url={selectedCert.Gambar_Sertifikasi_URL}
                      alt={selectedCert.Nama_Sertifikasi}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                      <Award className="w-24 h-24 text-gray-500" />
                    </div>
                  )}
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-2 border-white/20 rounded-full animate-pulse" />
                <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-white/10 rounded-full animate-bounce" />
              </div>

              {/* Right Side - Details */}
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-4">
                  <Badge className="w-fit bg-white/10 text-white border-white/20 px-4 py-2 backdrop-blur-sm">
                    <Award className="w-4 h-4 mr-2" />
                    Professional Certificate
                  </Badge>

                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                    {selectedCert.Nama_Sertifikasi}
                  </h2>

                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg font-medium">Issued: {selectedCert.Tanggal_Diterbitkan}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Description</h3>
                  <p className="text-gray-300 text-lg leading-relaxed">{selectedCert.Deskripsi}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6">
                  <Button className="flex-1 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-xl font-semibold group/btn">
                    <ExternalLink className="w-5 h-5 mr-2 group-hover/btn:rotate-45 transition-transform duration-300" />
                    View Certificate
                  </Button>
                  <Button
                    onClick={closeModal}
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white hover:text-black bg-transparent px-6 py-3 rounded-xl font-semibold"
                  >
                    Close
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="pt-6 border-t border-gray-700/50">
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>Certificate ID: {selectedCert.ID_Sertifikasi}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
