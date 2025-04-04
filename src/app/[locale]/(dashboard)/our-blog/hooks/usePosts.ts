import { useEffect, useState } from 'react'
import { PostServices } from '@/libs/api/post/post.service'
import { Post } from '@/libs/api/post/get-all-post.type'
import { PostCategoryType } from '@/types/post-category.enum'
import { CreatePostBody } from '@/libs/api/post/create-post.type'
import { UpdatePostBody } from '@/libs/api/post/update-post'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

export function useOurBlog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [category, setCategory] = useState('')

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editShowModal, setEditShowModal] = useState(false)
  const [showDeleteModal, setDeleteShowModal] = useState(false)
  const session = useSession()
  const userId = session.data?.user.id

  const [search, setSearch] = useState('')
  const fetchPost = async (category: string, username: string | undefined) => {
    try {
      const postList = await PostServices.getAllPost(category as PostCategoryType, 100, 0, username)
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
      setShowCreateModal(false)
      fetchPost(category, userId)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const updatePost = async (postId: string, body: UpdatePostBody) => {
    try {
      await PostServices.updatePost(postId, body)
      setEditShowModal(false)
      fetchPost(category, userId)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const deletePostById = async (postId: string) => {
    try {
      await PostServices.deletePostById(postId)
      setDeleteShowModal(false)
      fetchPost(category, userId)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchPost(category, userId)
  }, [category, userId])

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
    showCreateModal,
    setShowCreateModal,
    editShowModal,
    setEditShowModal,
    setSearch,
    search,
    setSelectedPost,
    selectedPost,
    updatePost,
    setDeleteShowModal,
    showDeleteModal,
    deletePostById,
  }
}
