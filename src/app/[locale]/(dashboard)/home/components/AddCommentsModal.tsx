'use client'

import CustomButton from '@/components/CustomButton'
import React, { useState, useEffect } from 'react'

interface AddCommentsModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (comment: string) => void
  initialValue?: string
}

const AddCommentsModal: React.FC<AddCommentsModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValue = '',
}) => {
  const [comment, setComment] = useState(initialValue)

  useEffect(() => {
    if (isOpen) {
      setComment(initialValue)
    }
  }, [isOpen, initialValue])

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment.trim())
      setComment('')
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-[400px] p-6 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add Comments</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer focus:outline-none"
            aria-label="Close"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <textarea
          placeholder="What's on your mind..."
          value={comment}
          onChange={e => setComment(e.target.value)}
          className="w-full px-3 py-2 border border-[#DADADA] rounded-lg mb-4 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
          autoFocus
        />

        <div className="flex flex-col space-y-3">
          <CustomButton variant="outline" onClick={onClose} className="w-full">
            Cancel
          </CustomButton>

          <CustomButton
            variant="primary"
            onClick={handleSubmit}
            disabled={!comment.trim()}
            className="w-full"
          >
            Post
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default AddCommentsModal
