'use client'
import { Session } from 'next-auth'
import { getSession, SessionProvider } from 'next-auth/react'
import { useMessages } from 'next-intl'
import { CSSProperties, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession()
      setSession(sessionData)
      setIsClient(true)
    }
    fetchSession()
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <SessionProvider session={session}>
      {children}
      <ToastContainer />
    </SessionProvider>
  )
}
