'use client'

import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'

const LoginPage = () => {
  const [username, setUsername] = useState('admin2')
  const [password, setPassword] = useState('admin2')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username || !password) {
      setError('Please enter username and password')
      return
    }

    try {
      setLoading(true)
      setError('')
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })
      if (result?.error) {
        setError('Invalid username or password')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An error occurred, please try again')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen  bg-[#243831]">
      <div className="w-full flex flex-col xl:flex-row-reverse">
        <header className="bg-[#2B5F44] min-h-[362px] xl:w-[632px] xl:h-full w-full rounded-b-4xl items-center justify-center flex flex-col">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 2xl:w-[300] 2xl:h-[230px]">
            <Image
              src="/assets/picture/logo.png"
              alt="Logo"
              fill={true}
              className="object-contain"
            />
          </div>
          <h1 className="text-white mt-[27px]">a Board</h1>
        </header>
        <aside className="flex  flex-col items-start justify-center w-full h-full px-4 gap-[40px] xl:items-center xl:justify-center">
          <h1 className="text-white text-2xl font-bold">Signin</h1>
          <div className="flex flex-col w-full xl:w-[384px] gap-[20px]">
            <CustomInput
              placeholder="Username"
              className="w-full"
              errorMsg={error}
              value={username}
              onChange={e => {
                e.preventDefault()
                setUsername(e.target.value)
              }}
            />
            <CustomButton onClick={handleSubmit} variant="success" loading={loading}>
              Sign In
            </CustomButton>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default LoginPage
