import React, { ButtonHTMLAttributes, CSSProperties } from 'react'
import { ClipLoader } from 'react-spinners'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success'
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
  w-full
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
      bg-[#2B5F44] 
      text-white 
      hover:bg-[#1f4a33] 
      focus:ring-[#2B5F44]
    `,
    secondary: `
      bg-gray-500 
      text-white 
      hover:bg-gray-600 
      focus:ring-gray-500
    `,
    success: `
      bg-[#49A569] 
      text-white 
      hover:bg-[#3D8C57] 
  `,
  }

  return (
    <button
      disabled={loading}
      {...rest}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${className}
        
      `}
    >
      {children}
      {loading && <ClipLoader size={14} color="white" />}
    </button>
  )
}

export default CustomButton
