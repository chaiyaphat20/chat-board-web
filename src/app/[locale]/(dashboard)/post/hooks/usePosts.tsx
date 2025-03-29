import { useEffect, useState } from 'react'
import { PostServices } from '@/libs/api/post/post.service'
import { Post } from '@/libs/api/post/get-all-post.type'
import { PostCategoryType } from '@/types/post-category.enum'
import { CreatePostBody } from '@/libs/api/post/create-post.type'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [category, setCategory] = useState('')
  const [showModal, setShowModal] = useState(false)
  const fetchPost = async (category: string) => {
    try {
      const postList = await PostServices.getAllPost(category as PostCategoryType, 100, 0)
      setPosts(postList)
      console.log({ postList })
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  const createPost = async (categoryData: PostCategoryType, topic: string, content: string) => {
    try {
      const body: CreatePostBody = {
        category: categoryData,
        content,
        topic,
      }
      await PostServices.createPost(body)
      setShowModal(false)
      fetchPost(category)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  useEffect(() => {
    fetchPost(category)
  }, [category])

  return { posts, category, setCategory, createPost, showModal, setShowModal }
}
