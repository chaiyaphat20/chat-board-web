import { PostCategoryType } from '@/types/post-category.enum'

export type CreatePostBody = {
  topic: string
  content: string
  category: PostCategoryType
}

export type CreatePostResponse = {
  id: number
  user_id: string
  topic: string
  content: string
  category: string
  created_at: Date
  updated_at: Date
  is_active: boolean
  user: User
}

export type User = {
  id: string
  username: string
  fullName: string
}
