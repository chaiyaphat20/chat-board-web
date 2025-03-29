import React, { useState } from 'react'
import CustomButton from '@/components/CustomButton'
import Dropdown from '@/components/Dropdown'
import { CATEGORY } from '@/constants/constants'

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onPost?: (postData: { community: string; title: string; content: string }) => void
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPost }) => {
  const [community, setCommunity] = useState('')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const handlePost = () => {
    if (onPost) {
      onPost({ community, title, content })
    }
    onClose()
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
        <h2 className="text-xl font-bold mb-6 text-center">Create Post</h2>

        <div className="mb-4">
          <Dropdown
            options={CATEGORY}
            onSelect={value => setCommunity(value)}
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
          <CustomButton variant="secondary" onClick={onClose}>
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
