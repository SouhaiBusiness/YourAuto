import Image from "next/image"
import Link from "next/link"
import { Car, Award, Clock, Users, Shield, ThumbsUp } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Our Company</h1>

        {/* Hero section */}
        <div className="relative w-full h-[300px] rounded-xl overflow-hidden mb-12">
          <Image src="/gallery/mazda-3sedan.webp?height=300&width=800" alt="Our rental fleet" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/70 to-transparent flex items-center">
            <div className="p-8 text-white max-w-md">
              <h2 className="text-3xl font-bold mb-4">Your Journey, Our Passion</h2>
              <p className="text-lg">Providing quality vehicles and exceptional service since 2010</p>
            </div>
          </div>
        </div>

        {/* Our story */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Car className="mr-2 h-6 w-6 text-orange-500" />
            Our Story
          </h2>
          <p className="text-gray-700 mb-4">
            Founded in 2010, <span className="text-orange-500">YourAuto</span> began with a simple mission: to provide high-quality vehicles at affordable
            prices with exceptional customer service. What started as a small fleet of just 5 cars has grown into a
            diverse collection of vehicles to suit every need and preference.
          </p>
          <p className="text-gray-700 mb-4">
            Over the years, we've expanded our offerings to include not just cars, but also motorcycles, vans, and
            all-terrain vehicles. This expansion reflects our commitment to meeting the evolving needs of our customers
            and providing options for every type of journey.
          </p>
          <p className="text-gray-700">
            Today, we're proud to be a leading vehicle rental service, known for our reliability, transparency, and
            customer-first approach. Our team of dedicated professionals works tirelessly to ensure that every rental
            experience is smooth, enjoyable, and exceeds expectations.
          </p>
        </div>

        {/* Our values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Award className="mr-2 h-6 w-6 text-orange-500" />
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold">Safety First</h3>
              </div>
              <p className="text-gray-700">
                We maintain our vehicles to the highest standards, ensuring your safety on every journey.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <ThumbsUp className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold">Customer Satisfaction</h3>
              </div>
              <p className="text-gray-700">
                Your satisfaction is our priority. We go above and beyond to exceed your expectations.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold">Reliability</h3>
              </div>
              <p className="text-gray-700">Count on us for punctual service and vehicles that won't let you down.</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-orange-500 mr-3" />
                <h3 className="text-xl font-semibold">Community</h3>
              </div>
              <p className="text-gray-700">
                We're proud to be part of the community and contribute to local initiatives.
              </p>
            </div>
          </div>
        </div>

        {/* Team section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Users className="mr-2 h-6 w-6 text-orange-500" />
            Our Team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "Alae Dahbi", role: "Founder & CEO", image: "/CEO.jpg?height=150&width=150" },
              { name: "Lamine Doulmi", role: "Operations Manager", image: "/operationsmanager.jpg?height=150&width=150" },
              { name: "Anas Daki", role: "Fleet Manager", image: "/fleetmanager.jpg?height=150&width=150" },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-50 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Experience Our Service?</h2>
          <p className="text-gray-700 mb-6">Browse our selection of vehicles and book your next rental today.</p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="bg-orange-500 text-white px-6 py-3 rounded-md font-medium hover:bg-orange-600 transition-colors"
            >
              View Vehicles
            </Link>
            <Link
              href="/contact"
              className="bg-white text-orange-500 border border-orange-500 px-6 py-3 rounded-md font-medium hover:bg-blue-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

