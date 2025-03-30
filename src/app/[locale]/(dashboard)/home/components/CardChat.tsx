import { Post } from '@/libs/api/post/get-all-post.type'
import React from 'react'
import CommentComponent from './CommentComponent'
import Image from 'next/image'

interface CardChatProps {
  isRoundFirst?: boolean
  isRoundLast?: boolean
  post: Post
  onClick?: () => void
}

function CardChat({ post, isRoundFirst, isRoundLast, onClick }: CardChatProps) {
  const handleClick = () => {
    if (onClick) onClick()
  }

  return (
    <div
      className={`
        border-b border-[0.5px] border-gray-100 px-5 py-[21.49px] 
        cursor-pointer hover:bg-gray-50 transition-colors
        ${isRoundFirst ? 'rounded-t-2xl' : ''}
        ${isRoundLast ? 'rounded-b-2xl' : ''}
      `}
      onClick={handleClick}
    >
      <section className="flex flex-row items-center gap-2.5">
        <Image src={'/assets/svg/Avatar.svg'} alt="avatar" width={31} height={31} />
        <p className="text-[#939494]">{post?.user?.fullName ?? '-'}</p>
      </section>

      {post.category && (
        <section className="bg-[#F3F3F3] rounded-full px-4 py-1 w-fit mt-[15px]">
          <p className="text-[#4A4A4A]">{post.category}</p>
        </section>
      )}

      <section className="mt-[5px]">
        <h2 className="text-gray-900 text-lg font-medium">{post.topic}</h2>
        <p className="text-gray-900 text-sm line-clamp-3">{post.content}</p>
      </section>

      <CommentComponent count={post._count?.comments || 0} />
    </div>
  )
}

export default CardChat
