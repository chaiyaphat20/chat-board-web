'use client'

import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import CommentComponent from '../components/CommentComponent'
import CustomButton from '@/components/CustomButton'
import CardComment from '../components/CardComment'
import { PostServices } from '@/libs/api/post/post.service'
import { GetPostWithComment } from '@/libs/api/post/get-post-with-comment.type'
import Image from 'next/image'
import { timeAgo } from '@/utils/convertTime'
import { useComment } from '../hooks/useComment'
import AddCommentsModal from '../components/AddCommentsModal'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'

function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [postWithComment, setPostWithComment] = useState<GetPostWithComment | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { data: sessionData } = useSession()
  const userName = sessionData?.user?.username

  const handleCommentAdded = async () => {
    await fetchPostWithComment(id)
  }

  const {
    comment,
    isAddingComment,
    isSubmitting,
    error,
    openCommentBox,
    closeCommentBox,
    handleCommentChange,
    submitComment,
  } = useComment({
    postId: id,
    onCommentAdded: handleCommentAdded,
  })

  const handleGoBack = () => {
    router.back()
  }

  const fetchPostWithComment = async (postId: string) => {
    try {
      if (!postId) return
      setIsLoading(true)
      const result = await PostServices.getPostWithComment(postId)
      setPostWithComment(result)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPostWithComment(id)
  }, [id])

  if (isLoading) {
    return (
      <div className="py-[24.5px] px-4 bg-white min-h-[calc(100vh-60px)] lg:px-[100px] flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    )
  }

  if (!postWithComment) {
    return (
      <div className="py-[24.5px] px-4 bg-white min-h-[calc(100vh-60px)] lg:px-[100px] flex items-center justify-center">
        <p className="text-lg">Post not found</p>
      </div>
    )
  }

  return (
    <div className="py-[24.5px] px-4 bg-white min-h-[calc(100vh-60px)] lg:px-[100px]">
      <main>
        <header>
          <div
            onClick={handleGoBack}
            className="bg-[#D8E9E4] size-[44px] flex items-center justify-center rounded-full cursor-pointer hover:bg-[#c5e0d9] transition-colors"
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 8.92529H1M1 8.92529L8 15.9253M1 8.92529L8 1.92529"
                stroke="#243831"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </header>
        <section className="mt-10 flex flex-col gap-2.5">
          <div className="flex flex-row gap-2.5 items-center">
            <Image src={'/assets/svg/Avatar.svg'} alt="avatar" width={48} height={48} />
            <div className="font-medium">{postWithComment.user.fullName}</div>
            <p className="text-[#939494] text-sm">{timeAgo(postWithComment.created_at)}</p>
          </div>
          <div className="px-4 py-1 rounded-full w-fit bg-[#F3F3F3] flex items-center justify-center">
            <p className="text-[#4A4A4A]">{postWithComment.category}</p>
          </div>
        </section>
        <section className="mt-4">
          <h2 className="text-gray-900 text-[28px] font-bold">{postWithComment.topic}</h2>
          <p className="text-sm text-[#191919] mt-4 whitespace-pre-wrap">
            {postWithComment.content}
          </p>
          <CommentComponent count={postWithComment.comments.length} />
        </section>

        {!isAddingComment && userName && (
          <CustomButton variant="outline" className="mt-[28px]" onClick={openCommentBox}>
            Add Comment
          </CustomButton>
        )}

        {isAddingComment && (
          <div className="mt-5 lg:block hidden">
            <textarea
              placeholder="What's on your mind..."
              value={comment}
              onChange={handleCommentChange}
              className="w-full px-3 py-2 border border-[#DADADA] rounded-lg mb-4 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="w-full flex flex-row justify-end gap-3">
              <CustomButton className="w-full lg:w-fit" variant="outline" onClick={closeCommentBox}>
                Cancel
              </CustomButton>

              <CustomButton
                variant="primary"
                className="w-full lg:w-fit"
                onClick={() => submitComment(postWithComment.id)}
                disabled={isSubmitting || !comment.trim()}
              >
                {isSubmitting ? 'Posting...' : 'Post'}
              </CustomButton>
            </div>
          </div>
        )}
      </main>

      {postWithComment.comments.length > 0 && (
        <section className="mt-6 flex flex-col gap-6">
          {postWithComment.comments.map((item, index) => (
            <CardComment key={item.id || index} comment={item} />
          ))}
        </section>
      )}

      <div className="lg:hidden block">
        <AddCommentsModal
          isOpen={isAddingComment}
          onClose={closeCommentBox}
          onSubmit={comment => submitComment(postWithComment.id, comment)}
        />
      </div>
    </div>
  )
}

export default Page
