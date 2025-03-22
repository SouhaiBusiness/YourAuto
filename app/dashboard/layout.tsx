//"use client"

import type React from "react"
import type { Metadata } from 'next';
import Link from "next/link"
import { Car, CalendarDays } from "lucide-react"

export const metadata: Metadata = {
  title: 'YourAuto | dashboard',
  description: 'Add, edit, delete and manage booked cars',
  icons: "/favicon.ico", 
};


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Car className="h-6 w-6" />
            <span>Car Rental Dashboard</span>
          </Link>
          <nav className="ml-auto flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium text-orange-500 transition-colors hover:text-orange-700">
              View Website
            </Link>
          </nav>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[240px_1fr]">
        <div className="border-r bg-gray-50 p-4">
          <nav className="flex flex-col space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-orange-500 transition-all hover:bg-blue-100"
            >
              <Car className="h-5 w-5" />
              <span>Car Management</span>
            </Link>
            <Link
              href="/dashboard/bookings"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-orange-500 transition-all hover:bg-blue-100"
            >
              <CalendarDays className="h-5 w-5" />
              <span>Bookings</span>
            </Link>
          </nav>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

