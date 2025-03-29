import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import Dropdown from '@/components/Dropdown'
import { CATEGORY } from '@/constants/constants'
import { PostCategory, PostCategoryType } from '@/types/post-category.enum'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onPost?: (postData: { community: PostCategoryType; title: string; content: string }) => void
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPost }) => {
  const [community, setCommunity] = useState<PostCategoryType | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handlePost = () => {
    if (onPost && community) {
      onPost({ community, title, content })
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-[500px] p-6 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="mb-6 items-center justify-between flex flex-row">
          <h2 className="text-xl font-bold  text-start">Create Post</h2>
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
            options={CATEGORY}
            onSelect={value => setCommunity(value as PostCategory)}
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

        <div className="flex justify-end space-x-4">
          <CustomButton variant="outline" onClick={onClose}>
            Cancel
          </CustomButton>

          <CustomButton
            variant="primary"
            onClick={handlePost}
            disabled={!community || !title || !content}
          >
            Post
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal
