export type Post = {
  id: number
  user_id: string
  topic: string
  content: string
  category: string
  created_at: Date
  updated_at: Date
  is_active: boolean
  user: WelcomeUser
  comments: Comment[]
  _count: Count
}

export type Count = {
  comments: number
}

export type Comment = {
  id: number
  user: CommentUser
  content: string
  created_at: Date
}

export type CommentUser = {
  id: string
  fullName: string
}

export type WelcomeUser = {
  id: string
  username: string
  fullName: string
}
