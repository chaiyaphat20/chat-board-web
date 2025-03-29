export interface GetPostWithComment {
  id: number
  user_id: string
  topic: string
  content: string
  category: string
  created_at: Date
  updated_at: Date
  is_active: boolean
  user: User
  comments: Comment[]
}

export type Comment = {
  id: number
  user_id: string
  post_id: number
  content: string
  created_at: Date
  user: User
}

export type User = {
  id: string
  username: string
  fullName: string
}
