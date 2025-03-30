import { PostCategoryType } from '@/types/post-category.enum'

export type UpdatePostBody = {
  topic: string
  content: string
  category: PostCategoryType
}
