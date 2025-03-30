import { Post } from '@/libs/api/post/get-all-post.type'
import React from 'react'
import CommentComponent from './CommentComponent'
import Image from 'next/image'

interface Props {
  isRoundFirst?: boolean
  isRoundLast?: boolean
  post: Post
  onClickEdit?: (post: Post) => void
  onClickDelete?: (post: Post) => void
}

function CardChat({ post, isRoundFirst, isRoundLast, onClickEdit, onClickDelete }: Props) {
  return (
    <div
      className={`border-b border-[0.5px] border-gray-100 px-5 py-[21.49px]  ${
        isRoundFirst ? 'rounded-t-2xl' : ''
      }
        ${isRoundLast ? 'rounded-b-2xl' : ''}`}
    >
      <div className="items-center flex-row flex justify-between">
        <section className="flex flex-row items-center gap-2.5">
          <Image src={'/assets/svg/Avatar.svg'} alt="avatar" width={31} height={31} />
          <p className="text-[#939494]">{post?.user?.fullName ?? '-'}</p>
        </section>
        <div className="flex flex-row gap-2">
          <svg
            onClick={() => {
              if (onClickEdit) {
                onClickEdit(post)
              }
            }}
            className="cursor-pointer"
            width={15}
            height={14}
            viewBox="0 0 15 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.26121 12.9084H13.2612M1.26123 12.9084H2.37759C2.70371 12.9084 2.86677 12.9084 3.02022 12.8715C3.15627 12.8389 3.28633 12.785 3.40563 12.7119C3.54018 12.6294 3.65548 12.5141 3.88609 12.2835L12.2612 3.90835C12.8135 3.35607 12.8135 2.46064 12.2612 1.90835C11.709 1.35607 10.8135 1.35607 10.2612 1.90835L1.88607 10.2835C1.65547 10.5141 1.54017 10.6294 1.45771 10.764C1.38461 10.8833 1.33073 11.0133 1.29807 11.1494C1.26123 11.3028 1.26123 11.4659 1.26123 11.792V12.9084Z"
              stroke="#2B5F44"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <svg
            onClick={() => {
              if (onClickDelete) {
                onClickDelete(post)
              }
            }}
            className="cursor-pointer"
            width={15}
            height={15}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.9279 3.57536V3.04202C9.9279 2.29529 9.9279 1.92192 9.78257 1.6367C9.65474 1.38582 9.45077 1.18185 9.19988 1.05402C8.91467 0.908691 8.5413 0.908691 7.79456 0.908691H6.7279C5.98116 0.908691 5.60779 0.908691 5.32258 1.05402C5.07169 1.18185 4.86772 1.38582 4.73989 1.6367C4.59456 1.92192 4.59456 2.29529 4.59456 3.04202V3.57536M5.9279 7.24202V10.5754M8.59456 7.24202V10.5754M1.26123 3.57536H13.2612M11.9279 3.57536V11.042C11.9279 12.1621 11.9279 12.7222 11.7099 13.15C11.5182 13.5263 11.2122 13.8323 10.8359 14.024C10.4081 14.242 9.848 14.242 8.7279 14.242H5.79456C4.67446 14.242 4.11441 14.242 3.68658 14.024C3.31026 13.8323 3.0043 13.5263 2.81255 13.15C2.59456 12.7222 2.59456 12.1621 2.59456 11.042V3.57536"
              stroke="#2B5F44"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
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
