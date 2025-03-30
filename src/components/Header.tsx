'use client'

import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MenuItemProps } from './SideMenu'
import { useRouter } from 'next/navigation'
import CustomButton from './CustomButton'
import { getSession, useSession } from 'next-auth/react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
const HeaderMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState('home')
  const router = useRouter()
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  const session = useSession()
  const userName = session.data?.user.username

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
            d="M8.10645 17.488H16.1064M11.1241 3.25204L4.34184 8.52716C3.88847 8.87978 3.66178 9.05609 3.49847 9.27689C3.35381 9.47248 3.24605 9.69282 3.18047 9.92709C3.10645 10.1916 3.10645 10.4787 3.10645 11.0531V18.288C3.10645 19.4081 3.10645 19.9682 3.32443 20.396C3.51618 20.7723 3.82214 21.0783 4.19846 21.27C4.62629 21.488 5.18634 21.488 6.30645 21.488H17.9064C19.0266 21.488 19.5866 21.488 20.0144 21.27C20.3908 21.0783 20.6967 20.7723 20.8885 20.396C21.1064 19.9682 21.1064 19.4081 21.1064 18.288V11.0531C21.1064 10.4787 21.1064 10.1916 21.0324 9.92709C20.9668 9.69282 20.8591 9.47248 20.7144 9.27689C20.5511 9.05609 20.3244 8.87978 19.8711 8.52716L13.0888 3.25204C12.7374 2.97878 12.5618 2.84216 12.3678 2.78964C12.1966 2.7433 12.0162 2.7433 11.8451 2.78964C11.6511 2.84216 11.4755 2.97878 11.1241 3.25204Z"
            stroke="#D8E9E4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 'our-blog',
      label: 'Our Blog',
      icon: (
        <svg
          width="22"
          height="23"
          viewBox="0 0 22 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.1064 3.48802H5.90645C4.22629 3.48802 3.38621 3.48802 2.74447 3.815C2.17999 4.10262 1.72105 4.56156 1.43343 5.12605C1.10645 5.76778 1.10645 6.60786 1.10645 8.28802V16.688C1.10645 18.3682 1.10645 19.2083 1.43343 19.85C1.72105 20.4145 2.17999 20.8734 2.74447 21.161C3.38621 21.488 4.22629 21.488 5.90645 21.488H14.3064C15.9866 21.488 16.8267 21.488 17.4684 21.161C18.0329 20.8734 18.4918 20.4145 18.7795 19.85C19.1064 19.2083 19.1064 18.3682 19.1064 16.688V12.488M7.10642 15.488H8.78096C9.27014 15.488 9.51473 15.488 9.74491 15.4328C9.94898 15.3838 10.1441 15.303 10.323 15.1933C10.5248 15.0696 10.6978 14.8967 11.0437 14.5508L20.6064 4.98802C21.4349 4.15959 21.4349 2.81645 20.6064 1.98802C19.778 1.15959 18.4349 1.15959 17.6064 1.98802L8.04368 11.5508C7.69778 11.8967 7.52482 12.0696 7.40114 12.2715C7.29148 12.4504 7.21067 12.6455 7.16168 12.8496C7.10642 13.0797 7.10642 13.3243 7.10642 13.8135V15.488Z"
            stroke="#BBC2C0"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ]

  return (
    <div className="w-full fixed top-0 left-0 z-10">
      <header className="flex items-center justify-between p-4 bg-green-500 text-white ">
        <h1 className="text-lg font-bold font-castoro-italic text-[20px]">a Board</h1>
        <button onClick={() => setIsOpen(true)} className=" lg:hidden">
          <Menu size={20} />
        </button>

        {!userName ? (
          <CustomButton className="hidden lg:block">Sign In</CustomButton>
        ) : (
          <div className="gap-[20px] hidden lg:flex  items-center justify-center">
            <p>{userName}</p>
            <div className="size-[40px] rounded-full bg-green-100" />
          </div>
        )}
      </header>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50"
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
            className="fixed top-0 right-0 h-full w-64 bg-green-500 shadow-lg p-4 z-[999]"
          >
            <button onClick={() => setIsOpen(false)} className="ml-[28px] cursor-pointer">
              <svg
                width="19"
                height="15"
                viewBox="0 0 19 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.10645 7.48804L17.1064 7.48804M17.1064 7.48804L11.1064 1.48804M17.1064 7.48804L11.1064 13.488"
                  stroke="#D8E9E4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <nav className="mt-10">
              <ul className="space-y-4">
                {menuItems.map(item => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        setSelectedMenuItem(item.id)
                        router.push(item.id)
                        setIsOpen(false)
                      }}
                      className={`
                      flex gap-4 px-[28px] cursor-pointer 
                      
                    `}
                    >
                      {item.icon}
                      <h3
                        className={`
                        ${
                          selectedMenuItem === item.id
                            ? 'text-green-100 font-semibold'
                            : 'text-gray-600 hover:text-green-100'
                        }
                      `}
                      >
                        {item.label}
                      </h3>
                    </div>
                  )
                })}
                <div className="w-full bg-gray-100 h-0.5" />
                <div
                  className="ml-[28px] mt-30 flex gap-3 cursor-pointer"
                  onClick={() => {
                    if (session) {
                      handleLogout()
                    } else {
                      router.replace('/login')
                    }
                  }}
                >
                  <Image alt="" src={'/assets/svg/logout-white.svg'} width={25} height={25} />
                  <p className="text-gray-300 font-bold">{!session ? 'Logout' : 'Login'}</p>
                </div>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HeaderMenu
