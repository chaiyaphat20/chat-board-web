'use client'

import CustomButton from '@/components/CustomButton'
import CardChat from './components/CardChat'
import { useEffect, useState } from 'react'
import { PostServices } from '@/libs/api/post/post.service'
import { Post } from '@/libs/api/post/get-all-post.type'
import { useRouter } from 'next/navigation'
import Dropdown from '@/components/Dropdown'
import { CATEGORY } from '@/constants/constants'
import { PostCategoryType } from '@/types/post-category.enum'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [category, setCategory] = useState('')
  const router = useRouter()

  const fetchPost = async (category: string) => {
    try {
      const postList = await PostServices.getAllPost(category as PostCategoryType, 100, 0)
      setPosts(postList)
      console.log({ postList })
    } catch (error) {
    } finally {
    }
  }

  const handleClick = (postId: string) => {
    router.push(`/post/${postId}`)
  }

  const handleSelect = (category: string) => {
    setCategory(category)
  }

  useEffect(() => {
    fetchPost(category)
  }, [category])

  return (
    <div className="w-full min-h-[calc(100vh-60px)]  overflow-hidden flex flex-col px-4 lg:px-[40px] bg-[#BBC2C0] ">
      <header className="min-h-[40px] flex items-center mt-[48px] justify-between bg-red top-[60px]">
        <svg
          width="18"
          height="17"
          viewBox="0 0 18 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 15.938L12.875 12.313M14.8333 7.60465C14.8333 11.2866 11.8486 14.2713 8.16667 14.2713C4.48477 14.2713 1.5 11.2866 1.5 7.60465C1.5 3.92276 4.48477 0.937988 8.16667 0.937988C11.8486 0.937988 14.8333 3.92276 14.8333 7.60465Z"
            stroke="#191919"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex flex-row items-center gap-1.5">
          <Dropdown options={CATEGORY} onSelect={handleSelect} isHideBg placeholder="Community" />
          <CustomButton variant="success">
            <p className="text-white font-bold">Create +</p>
          </CustomButton>
        </div>
      </header>
      {/* Section ที่สามารถ Scroll ได้ */}
      <section className="flex-1  rounded-2xl w-full  bg-white mt-6 ">
        {posts.map((post, index) => {
          return (
            <CardChat
              isRoundFirst={index === 0}
              isRoundLast={index === posts.length - 1}
              key={index}
              post={post}
              onClick={() => {
                handleClick('' + post.id)
              }}
            />
          )
        })}
      </section>
    </div>
  )
}
