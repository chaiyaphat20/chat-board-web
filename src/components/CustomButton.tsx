import React, { ButtonHTMLAttributes, CSSProperties } from 'react'
import { ClipLoader } from 'react-spinners'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'outline'
  loading?: boolean
}

const override: CSSProperties = {
  borderColor: 'red',
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  loading = false,
  ...rest
}) => {
  const baseStyles = `
    font-semibold
    text-base
    py-[10px]
    px-4
    rounded-lg
    transition-colors
    duration-300
    focus:outline-none
    disabled:opacity-50
    disabled:cursor-not-allowed
    select-none
    cursor-pointer
    flex-row
    flex
    gap-2
    items-center
    justify-center
  `

  // Variant-specific styles
  const variantStyles = {
    primary: `
      bg-success
      text-white
      hover:bg-[#3D8C57]
      focus:ring-[#3D8C57]
    `,
    secondary: `
      bg-gray-500
      text-white
      hover:bg-gray-600
      focus:ring-gray-500
    `,
    success: `
      bg-success
      text-white
      hover:bg-[#3D8C57]
    `,
    outline: `
      bg-transparent
      border-1
      border-[#49A569]
      text-[#49A569]
      hover:bg-[#49A569]/10
    `,
  }

  return (
    <button
      disabled={loading}
      {...rest}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
          min-w-[105px]
        h-fit
        w-fit
        ${className}
      `}
    >
      {children}
      {loading && <ClipLoader size={14} color="white" />}
    </button>
  )
}

export default CustomButton
