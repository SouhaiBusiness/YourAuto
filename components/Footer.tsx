import Link from 'next/link';
import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='container mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Company Info */}
          <div>
            <div className='flex justify-between items-center'>
              <h3 className='text-orange-500 text-xl font-bold mb-4'>YourAuto</h3>
              <Image
                src='/Mercedes.png'
                alt='logo'
                width={100}
                height={100}
                className=''
              />
            </div>
            <p className='text-gray-400 mb-4'>
              Your trusted partner for all your vehicle rental needs. Quality
              vehicles at affordable prices.
            </p>
            <div className='flex space-x-4'>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Facebook size={20} />
                <span className='sr-only'>Facebook</span>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Instagram size={20} />
                <span className='sr-only'>Instagram</span>
              </a>
              <a
                href='#'
                className='text-gray-400 hover:text-white transition-colors'
              >
                <Twitter size={20} />
                <span className='sr-only'>Twitter</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/about'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/gallery'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Vehicle Gallery
                </Link>
              </li>
              <li>
                <Link
                  href='/contact'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Vehicle Categories</h3>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/gallery?tab=cars'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Cars
                </Link>
              </li>
              <li>
                <Link
                  href='/gallery?tab=motorcycles'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Motorcycles
                </Link>
              </li>
              <li>
                <Link
                  href='/gallery?tab=vans'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  Vans
                </Link>
              </li>
              <li>
                <Link
                  href='/gallery?tab=quads'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  ATVs & Quads
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
            <ul className='space-y-3'>
              <li className='flex items-start'>
                <MapPin className='mr-2 h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5' />
                <span className='text-gray-400'>
                  123 Rental Street, City Center, 10001
                </span>
              </li>
              <li className='flex items-center'>
                <Phone className='mr-2 h-5 w-5 text-gray-400' />
                <a
                  href='tel:+1234567890'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  (123) 456-7890
                </a>
              </li>
              <li className='flex items-center'>
                <Mail className='mr-2 h-5 w-5 text-gray-400' />
                <a
                  href='mailto:info@carrental.com'
                  className='text-gray-400 hover:text-white transition-colors'
                >
                  info@carrental.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 mt-12 pt-8 text-center text-gray-400'>
          <p>© {currentYear} YourAuto. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
