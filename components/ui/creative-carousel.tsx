"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface CreativeCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  title: string
  autoplay?: boolean
  interval?: number
  variant?: "fade" | "slide" | "zoom" | "flip"
}

export function CreativeCarousel({
  images,
  title,
  autoplay = true,
  interval = 5000,
  variant = "fade",
}: CreativeCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Handle autoplay
  useEffect(() => {
    if (autoplay && !isHovering) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, interval)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [autoplay, interval, images.length, isHovering])

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Get the appropriate animation class based on the variant
  const getAnimationClass = () => {
    switch (variant) {
      case "fade":
        return "transition-opacity duration-500 ease-in-out"
      case "slide":
        return "transition-transform duration-500 ease-in-out"
      case "zoom":
        return "transition-all duration-500 ease-in-out transform"
      case "flip":
        return "transition-all duration-500 ease-in-out transform perspective-1000"
      default:
        return "transition-opacity duration-500 ease-in-out"
    }
  }

  // Get the appropriate style for each slide based on the variant and whether it's active
  const getSlideStyle = (index: number) => {
    const isActive = index === currentIndex

    switch (variant) {
      case "fade":
        return {
          opacity: isActive ? 1 : 0,
          zIndex: isActive ? 10 : 0,
          position: "absolute" as const,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }
      case "slide":
        return {
          transform: `translateX(${(index - currentIndex) * 100}%)`,
          position: "absolute" as const,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }
      case "zoom":
        return {
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scale(1)" : "scale(0.8)",
          zIndex: isActive ? 10 : 0,
          position: "absolute" as const,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }
      case "flip":
        return {
          opacity: isActive ? 1 : 0,
          transform: isActive ? "rotateY(0deg)" : "rotateY(180deg)",
          zIndex: isActive ? 10 : 0,
          position: "absolute" as const,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden" as const,
        }
      default:
        return {
          opacity: isActive ? 1 : 0,
          zIndex: isActive ? 10 : 0,
          position: "absolute" as const,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }
    }
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <div
        className="relative w-full h-[400px] overflow-hidden rounded-xl shadow-xl mx-auto max-w-3xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div key={index} className={cn("w-full h-full", getAnimationClass())} style={getSlideStyle(index)}>
              <Image
                src={image.src || "/fallback-image.png"}
                alt={image.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  ;(e.target as HTMLImageElement).src = "/fallback-image.png"
                }}
              />

              {/* Caption overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                <p className="font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows - always visible with higher z-index */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors z-20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors z-20"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

