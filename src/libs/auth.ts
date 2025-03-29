import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import apiClient from './api/apiClient'
import { ApiResponse } from '@/types/api.types'

interface LoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export type User = {
  id: string
  username: string
  email: string
  fullName: string
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { username, password } = credentials as {
            username: string
            password: string
          }

          const response = await apiClient.post<ApiResponse<LoginResponse>>('/auth/login', {
            username,
            password,
          })
          console.log({ response: response.data })
          console.log({
            response: {
              username,
              password,
            },
          })
          const { accessToken, user } = response.data.data

          if (accessToken) {
            return {
              id: user.id,
              username: user.username,
              access_token: accessToken,
            }
          }
          return null
        } catch (error) {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          username: token.username as string,
          access_token: token.access_token as string,
        }
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.access_token = user.access_token
      }
      return token
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions
