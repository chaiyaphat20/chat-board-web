import { Post } from '@/libs/api/post/get-all-post.type'
import React from 'react'
import CommentComponent from './CommentComponent'

interface Props {
  post: Post
  onClick?: () => void
}

function CardChat({ post, onClick }: Props) {
  return (
    <div
      className="border-b border-[0.5px] border-gray-100 px-5 py-[21.49px] cursor-pointer"
      onClick={() => {
        if (onClick) {
          onClick()
        }
      }}
    >
      <section className="flex flex-row items-center gap-2.5">
        <div className="bg-gray-200 rounded-full size-[31.03px]" />
        <p className="text-gray-300">{post?.user?.fullName ?? '-'}</p>
      </section>
      <section className="bg-[#F3F3F3] rounded-full px-2 py-1 w-fit mt-[15px]">
        <p className="text-[#4A4A4A]">{post.category}</p>
      </section>
      <section className="mt-[5px]">
        <h2 className="text-gray-900 text-lg">{post.topic}</h2>
        <p className="text-gray-900 text-sm">{post.content}</p>
      </section>
      <CommentComponent count={post._count.comments} />
    </div>
  )
}

export default CardChat
