"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface GoogleDriveImageProps {
  url: string
  alt: string
  className?: string
}

export function GoogleDriveImage({ url, alt, className }: GoogleDriveImageProps) {
  const [currentUrl, setCurrentUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [urlIndex, setUrlIndex] = useState(0)

  // Extract file ID from various Google Drive URL formats
  const extractFileId = (driveUrl: string): string => {
    if (!driveUrl) return ""
    
    if (driveUrl.includes('drive.google.com/uc?export=view&id=')) {
      return driveUrl.split('id=')[1].split('&')[0]
    }
    
    if (driveUrl.includes('drive.google.com/file/d/')) {
      const match = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
      return match ? match[1] : ""
    }
    
    if (driveUrl.includes('drive.google.com/open?id=')) {
      return driveUrl.split('id=')[1].split('&')[0]
    }
    
    return ""
  }

  // Generate multiple URL formats to try
  const getUrlFormats = (driveUrl: string): string[] => {
    const fileId = extractFileId(driveUrl)
    if (!fileId) return []
    
    return [
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`,
      `https://lh3.googleusercontent.com/d/${fileId}`,
      driveUrl
    ]
  }

  useEffect(() => {
    if (!url || url.trim() === "") {
      setError(true)
      setLoading(false)
      return
    }

    const urlFormats = getUrlFormats(url)
    if (urlFormats.length === 0) {
      setError(true)
      setLoading(false)
      return
    }

    setCurrentUrl(urlFormats[0])
    setUrlIndex(0)
    setError(false)
    setLoading(true)
  }, [url])

  const handleImageLoad = () => {
    setLoading(false)
    setError(false)
  }

  const handleImageError = () => {
    const urlFormats = getUrlFormats(url)
    const nextIndex = urlIndex + 1
    
    if (nextIndex < urlFormats.length) {
      setUrlIndex(nextIndex)
      setCurrentUrl(urlFormats[nextIndex])
    } else {
      setError(true)
      setLoading(false)
    }
  }

  if (!url || url.trim() === "" || error) {
    return (
      <div className={cn("bg-gray-800 flex items-center justify-center", className)}>
        <div className="text-gray-400 text-sm">No image</div>
      </div>
    )
  }

  return (
    <div className={cn("relative", className)}>
      {currentUrl && (
        <img
          src={currentUrl}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          style={{ display: loading ? 'none' : 'block' }}
        />
      )}
      {loading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading...</div>
        </div>
      )}
    </div>
  )
}
