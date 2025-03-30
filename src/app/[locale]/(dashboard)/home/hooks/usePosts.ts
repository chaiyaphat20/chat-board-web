import { useEffect, useState } from 'react'
import { PostServices } from '@/libs/api/post/post.service'
import { Post } from '@/libs/api/post/get-all-post.type'
import { PostCategoryType } from '@/types/post-category.enum'
import { CreatePostBody } from '@/libs/api/post/create-post.type'
import { toast } from 'react-toastify'

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [category, setCategory] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch] = useState('')
  const fetchPost = async (category: string) => {
    try {
      const postList = await PostServices.getAllPost(category as PostCategoryType, 100, 0)
      setPosts(postList)
      console.log({ postList })
    } catch (error: any) {
      toast.error(error.message)
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
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchPost(category)
  }, [category])

  const postFilter = posts.filter(item => {
    if (search.trim().length >= 2) {
      return item.topic.toLowerCase().includes(search.toLowerCase())
    }
    return true
  })

  return {
    postFilter,
    category,
    setCategory,
    createPost,
    showModal,
    setShowModal,
    setSearch,
    search,
  }
}
