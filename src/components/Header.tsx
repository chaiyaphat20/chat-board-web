'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full fixed top-0 left-0">
      <header className="flex items-center justify-between p-4 bg-gray-800 text-white ">
        <h1 className="text-lg font-bold">My Website</h1>
        <button onClick={() => setIsOpen(true)} className=" lg:hidden">
          <Menu size={20} />
        </button>
      </header>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 z-50"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 bg-gray-200 rounded-full"
            >
              <X size={24} />
            </button>
            <nav className="mt-10">
              <ul className="space-y-4">
                <li>
                  <a href="#" className="block p-2 text-gray-800 hover:bg-gray-200 rounded">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 text-gray-800 hover:bg-gray-200 rounded">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 text-gray-800 hover:bg-gray-200 rounded">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="block p-2 text-gray-800 hover:bg-gray-200 rounded">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeaderMenu
