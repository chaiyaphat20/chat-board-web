'use client'

import { Link, usePathname } from '@/libs/i18nNavigation'
import { useLocale } from 'next-intl'
import { useState, useRef, useEffect } from 'react'

type SupportedLocale = 'en' | 'th'

export default function LocaleSwitcher() {
  const locale = useLocale() as SupportedLocale
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const localeDetails: Record<SupportedLocale, { flag: string; name: string }> = {
    en: { flag: '🇬🇧', name: 'English' },
    th: { flag: '🇹🇭', name: 'ไทย' },
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center space-x-1 px-4 py-2 rounded-md hover:bg-gray-100 transition-colors"
        onClick={toggleDropdown}
      >
        <span>{localeDetails[locale].flag}</span>
        <span>{localeDetails[locale].name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          {Object.entries(localeDetails).map(
            ([localeKey, { flag, name }]) =>
              localeKey !== locale && (
                <Link
                  key={localeKey}
                  href={pathname}
                  locale={localeKey as SupportedLocale}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left flex items-center space-x-2"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{flag}</span>
                  <span>{name}</span>
                </Link>
              )
          )}
        </div>
      )}
    </div>
  )
}
