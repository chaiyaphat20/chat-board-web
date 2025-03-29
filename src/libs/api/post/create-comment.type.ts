export type CreateCommentBody = {
  post_id: number
  content: string
}

export type CreateCommentResponse = {
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
