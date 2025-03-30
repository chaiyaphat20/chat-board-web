import { Todo } from '@/types/todo/response.type'
import { TodoType } from '@/types/todo/todo.schema'
import apiClient from '../apiClient'
import { Post } from './get-all-post.type'
import { ApiResponse } from '@/types/api.types'
import { PostCategoryType } from '@/types/post-category.enum'
import { GetPostWithComment } from './get-post-with-comment.type'
import { CreatePostBody, CreatePostResponse } from './create-post.type'
import { CreateCommentBody, CreateCommentResponse } from './create-comment.type'
import { UpdatePostBody } from './update-post'

export const PostServices = {
  getAllPost: async (
    category?: PostCategoryType,
    limit: number = 100,
    offset = 0,
    userId?: string
  ): Promise<Post[]> => {
    try {
      let url = `/posts?limit=${limit}&offset=${offset}`
      if (category) {
        url += `&category=${category}`
      }
      if (userId) {
        url += `&userId=${userId}`
      }
      const response = await apiClient.get<ApiResponse<Post[]>>(url)
      return response.data.data
    } catch (error) {
      throw error
    }
  },
  getPostWithComment: async (postId: string): Promise<GetPostWithComment> => {
    try {
      const response = await apiClient.get<ApiResponse<GetPostWithComment>>(
        `/posts/${postId}/with-comments`
      )
      return response.data.data
    } catch (error) {
      throw error
    }
  },
  createPost: async (body: CreatePostBody): Promise<CreatePostResponse> => {
    try {
      const response = await apiClient.post<ApiResponse<CreatePostResponse>>(`/posts`, body)
      return response.data.data
    } catch (error) {
      throw error
    }
  },

  addComment: async (body: CreateCommentBody): Promise<CreateCommentResponse> => {
    try {
      const response = await apiClient.post<ApiResponse<CreateCommentResponse>>(`/comments`, body)
      return response.data.data
    } catch (error) {
      throw error
    }
  },
  updatePost: async (postId: string, body: UpdatePostBody): Promise<string> => {
    try {
      const response = await apiClient.patch<ApiResponse<string>>(`/posts/${postId}`, body)
      return response.data.data
    } catch (error) {
      throw error
    }
  },
  deletePostById: async (postId: string): Promise<string> => {
    try {
      const response = await apiClient.delete<ApiResponse<string>>(`/posts/${postId}`)
      return response.data.data
    } catch (error) {
      throw error
    }
  },
}
