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
import SearchInputCustom from '@/components/SearchInputCustom'
import CreatePostModal from './components/CreatePostModal'

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [category, setCategory] = useState('')
  const [showModal, setShowModal] = useState(false)
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
        <SearchInputCustom />
        <div className="flex flex-row items-center gap-1.5">
          <Dropdown options={CATEGORY} onSelect={handleSelect} isHideBg placeholder="Community" />
          <CustomButton
            variant="success"
            onClick={() => {
              setShowModal(true)
            }}
          >
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
      <CreatePostModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false)
        }}
      />
    </div>
  )
}
