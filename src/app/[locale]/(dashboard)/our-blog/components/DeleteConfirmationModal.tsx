'use client'

import CustomButton from '@/components/CustomButton'
import React from 'react'

interface DeleteConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  title?: string
  message?: string
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  title = 'Please confirm if you wish to delete the post',
  message = 'Are you sure you want to delete the post? Once deleted, it cannot be recovered.',
}) => {
  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md mx-4 p-6 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center mb-4">{title}</h2>

        <p className="text-center text-gray-600 mb-6">{message}</p>

        <div className="space-y-4 lg:flex lg:flex-row lg:space-x-3">
          <CustomButton variant="danger" onClick={onDelete} className="w-full">
            Delete
          </CustomButton>

          <CustomButton
            variant="outline"
            onClick={onClose}
            className="w-full text-text-secondary border-text-secondary"
          >
            Cancel
          </CustomButton>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmationModal
