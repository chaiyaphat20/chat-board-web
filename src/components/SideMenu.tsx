'use client'
import React, { useState } from 'react'
interface MenuItemProps {
  id: string
  label: string
  icon: React.ReactNode
}

// Sidebar Component
const SideMenu: React.FC = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('home')

  // Menu items with SVG icons
  const menuItems: MenuItemProps[] = [
    {
      id: 'home',
      label: 'Home',
      icon: (
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.62695 17.2612H16.627M11.6446 3.02523L4.86234 8.30036C4.40897 8.65298 4.18229 8.82929 4.01898 9.05009C3.87432 9.24567 3.76655 9.46601 3.70098 9.70028C3.62695 9.96475 3.62695 10.2519 3.62695 10.8263V18.0612C3.62695 19.1813 3.62695 19.7414 3.84494 20.1692C4.03669 20.5455 4.34265 20.8515 4.71897 21.0432C5.1468 21.2612 5.70685 21.2612 6.82695 21.2612H18.427C19.5471 21.2612 20.1071 21.2612 20.5349 21.0432C20.9113 20.8515 21.2172 20.5455 21.409 20.1692C21.627 19.7414 21.627 19.1813 21.627 18.0612V10.8263C21.627 10.2519 21.627 9.96475 21.5529 9.70028C21.4874 9.46601 21.3796 9.24567 21.2349 9.05009C21.0716 8.82929 20.8449 8.65298 20.3916 8.30036L13.6093 3.02523C13.2579 2.75198 13.0823 2.61535 12.8883 2.56283C12.7171 2.51649 12.5368 2.51649 12.3656 2.56283C12.1716 2.61535 11.996 2.75198 11.6446 3.02523Z"
            stroke="#243831"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'blog',
      label: 'Our Blog',
      icon: (
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.627 3.26121H6.42695C4.7468 3.26121 3.90672 3.26121 3.26498 3.58819C2.7005 3.87581 2.24155 4.33476 1.95393 4.89924C1.62695 5.54098 1.62695 6.38106 1.62695 8.06121V16.4612C1.62695 18.1414 1.62695 18.9815 1.95393 19.6232C2.24155 20.1877 2.7005 20.6466 3.26498 20.9342C3.90672 21.2612 4.7468 21.2612 6.42695 21.2612H14.827C16.5071 21.2612 17.3472 21.2612 17.9889 20.9342C18.5534 20.6466 19.0124 20.1877 19.3 19.6232C19.627 18.9815 19.627 18.1414 19.627 16.4612V12.2612M7.62693 15.2612H9.30147C9.79065 15.2612 10.0352 15.2612 10.2654 15.206C10.4695 15.157 10.6646 15.0762 10.8435 14.9665C11.0454 14.8428 11.2183 14.6699 11.5642 14.324L21.127 4.76121C21.9554 3.93279 21.9554 2.58964 21.127 1.76121C20.2985 0.932787 18.9554 0.932785 18.127 1.76121L8.56419 11.324C8.21828 11.6699 8.04533 11.8428 7.92165 12.0446C7.81199 12.2236 7.73118 12.4187 7.68219 12.6228C7.62693 12.8529 7.62693 13.0975 7.62693 13.5867V15.2612Z"
            stroke="#243831"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      ),
    },
  ]

  return (
    <aside className="xl:min-w-[280px] xl:block hidden bg-gray-100 h-full min-h-[calc(100vh-60px)]">
      <div className="mt-8">
        {menuItems.map(item => (
          <div
            key={item.id}
            onClick={() => setSelectedMenuItem(item.id)}
            className={`
              flex gap-4 px-[28px] cursor-pointer p-4
              ${selectedMenuItem === item.id ? 'bg-gray-200' : 'hover:bg-gray-200'}
            `}
          >
            {item.icon}
            <h3>{item.label}</h3>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default SideMenu
