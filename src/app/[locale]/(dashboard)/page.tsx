'use client'

import Header from '@/components/Header'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return <div className="w-ful bg-amber-500">xxx</div>
}
