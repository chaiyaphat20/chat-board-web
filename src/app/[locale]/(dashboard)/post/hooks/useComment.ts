import { useState } from 'react'
import { PostServices } from '@/libs/api/post/post.service'
import { CreateCommentBody } from '@/libs/api/post/create-comment.type'

interface UseCommentProps {
  postId: string
  onCommentAdded?: () => void
}

export const useComment = ({ postId, onCommentAdded }: UseCommentProps) => {
  const [comment, setComment] = useState('')
  const [isAddingComment, setIsAddingComment] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const openCommentBox = () => {
    setIsAddingComment(true)
  }

  const closeCommentBox = () => {
    setIsAddingComment(false)
    setComment('')
    setError(null)
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
    setError(null)
  }

  const submitComment = async (postId: number, commentModal?: string) => {
    try {
      setIsSubmitting(true)
      setError(null)

      const body: CreateCommentBody = {
        content: commentModal ?? comment.trim(),
        post_id: postId,
      }
      await PostServices.addComment(body)

      setComment('')
      setIsAddingComment(false)

      onCommentAdded && onCommentAdded()
    } catch (err) {
      setError('Failed to submit comment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    comment,
    isAddingComment,
    isSubmitting,
    error,
    openCommentBox,
    closeCommentBox,
    handleCommentChange,
    submitComment,
  }
}
