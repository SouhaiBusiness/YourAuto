"use client"

import { useState, useEffect } from "react"
import { CreativeCarousel } from "@/components/ui/creative-carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample image data for each vehicle type
const vehicleImages = {
  cars: [
    { src: "/gallery/mercedesBenz.jpg", alt: "mercedesBenz" },
    { src: "/gallery/fordfiesta.jpg", alt: "fordfiesta" },
    { src: "/gallery/mazda-3sedan.webp", alt: "mazdaNewsroom" },
    { src: "/gallery/peugeot208.webp", alt: "peugeot208" },
    { src: "/gallery/2404-Mercedes-Benz-GLA.webp", alt: "Mercedes-Benz" },
  ],
  motorcycles: [
    { src: "/gallery/honda.webp", alt: "Sport Bike" },
    { src: "/gallery/Kawazaki.jpg", alt: "Kawazaki" },
    { src: "/gallery/suzukiGSX.jpg", alt: "suzukiGSX" },
    { src: "/gallery/tmax.png", alt: "tmax" },
    { src: "/gallery/Yamaha.jpg", alt: "Yamaha" },
  ],
  vans: [
    { src: "/gallery/vancamping.jpg", alt: "Passenger Van" },
    { src: "/gallery/vantravel.jpg", alt: "Cargo Van" },
    { src: "/gallery/van1.png", alt: "Camper Van" },
    { src: "/gallery/van2.webp", alt: "Minivan" },
  ],
  quads: [
    { src: "/gallery/quads.jpg", alt: "quad sport" },
    { src: "/gallery/quads2.jpg", alt: "quads" },
    { src: "/gallery/scooter.jpeg", alt: "Electrical Scooter" },
  ],
}

// Different animation variants for each carousel
const carouselVariants = ["fade", "slide", "zoom", "flip"] as const

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before rendering tabs to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="container mx-auto py-12 px-4">Loading...</div>
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Vehicle Gallery</h1>
      <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
        Explore our diverse collection of vehicles available for rent. From luxury cars to adventure-ready quads, we
        have the perfect vehicle for your next journey.
      </p>

      <Tabs defaultValue="all" onValueChange={setActiveTab} className="mb-12">
        <TabsList className="flex w-full flex-wrap gap-2 mx-auto mb-12">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="cars">Cars</TabsTrigger>
          <TabsTrigger value="motorcycles">Motorcycles</TabsTrigger>
          <TabsTrigger value="vans">Vans</TabsTrigger>
          <TabsTrigger value="quads">Quads & Scooters</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-8 space-y-12 ">
          <CreativeCarousel images={vehicleImages.cars} title="Premium Cars" variant={carouselVariants[0]} />
          <CreativeCarousel images={vehicleImages.motorcycles} title="Motorcycles" variant={carouselVariants[1]} />
          <CreativeCarousel images={vehicleImages.vans} title="Vans & Minivans" variant={carouselVariants[2]} />
          <CreativeCarousel images={vehicleImages.quads} title="ATVs & Quads" variant={carouselVariants[3]} />
        </TabsContent>

        <TabsContent value="cars" className="mt-8">
          <CreativeCarousel images={vehicleImages.cars} title="Premium Cars" variant="slide" />
        </TabsContent>

        <TabsContent value="motorcycles" className="mt-8">
          <CreativeCarousel images={vehicleImages.motorcycles} title="Motorcycles" variant="slide" />
        </TabsContent>

        <TabsContent value="vans" className="mt-8">
          <CreativeCarousel images={vehicleImages.vans} title="Vans & Minivans" variant="zoom" />
        </TabsContent>

        <TabsContent value="quads" className="mt-8">
          <CreativeCarousel images={vehicleImages.quads} title="ATVs & Quads" variant="flip" />
        </TabsContent>
      </Tabs>

      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Ready to Experience Our Vehicles?</h2>
        <p className="text-gray-600 mb-6">
          Browse our full catalog and find the perfect vehicle for your next adventure.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-orange-500 px-6 py-3 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
        >
          View All Rentals
        </a>
      </div>
    </div>
  )
}

