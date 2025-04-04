import React, { useEffect, useState } from 'react'
import CustomButton from '@/components/CustomButton'
import Dropdown from '@/components/Dropdown'
import { CATEGORY } from '@/constants/constants'
import { PostCategory, PostCategoryType } from '@/types/post-category.enum'
import { Post } from '@/libs/api/post/get-all-post.type'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  postData?: Post | null
  onPost?: (postData: { category: PostCategoryType; title: string; content: string }) => void
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPost, postData }) => {
  const [category, setCategory] = useState<PostCategoryType | null>(
    (postData?.category as PostCategoryType) ?? null
  )
  const [title, setTitle] = useState(postData?.topic ?? '')
  const [content, setContent] = useState(postData?.content ?? '')

  const handlePost = () => {
    if (onPost && category) {
      onPost({ category, title, content })
    }
  }

  useEffect(() => {
    if (postData) {
      setCategory((postData.category as PostCategoryType) || null)
      setTitle(postData.topic || '')
      setContent(postData.content || '')
    }
  }, [postData])

  useEffect(() => {
    if (!isOpen) {
      if (!postData) {
        setCategory(null)
        setTitle('')
        setContent('')
      }
    }
  }, [isOpen, postData])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-[500px] p-6 mx-4 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-6 items-center justify-between flex flex-row">
          <h2 className="text-xl font-bold  text-start">Edit Post</h2>
          <div className="cursor-pointer" onClick={onClose}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0459 7.1416L7.0459 17.1416M7.0459 7.1416L17.0459 17.1416"
                stroke="#243831"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="mb-4">
          <Dropdown
            defaultValue={category as any}
            options={CATEGORY}
            onSelect={value => setCategory(value as PostCategory)}
            placeholder="Choose a community"
          />
        </div>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-[#DADADA] rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <textarea
          placeholder="What's on your mind..."
          value={content}
          onChange={e => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-[#DADADA] rounded-lg mb-4 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="flex flex-col lg:flex-row justify-end space-y-4 lg:space-x-4">
          <CustomButton className="w-full lg:w-fit" variant="outline" onClick={onClose}>
            Cancel
          </CustomButton>

          <CustomButton
            variant="primary"
            className="w-full lg:w-fit"
            onClick={handlePost}
            disabled={!category || !title || !content}
          >
            Post
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal
