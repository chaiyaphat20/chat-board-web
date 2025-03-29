import React, { InputHTMLAttributes } from 'react'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string
}

const CustomInput = ({ className = '', errorMsg, ...rest }: CustomInputProps) => {
  return (
    <div className="gap-1 flex flex-col">
      <input
        {...rest}
        className={`
        w-full
        p-[10px]
        border 
        rounded-lg 
        bg-white 
        border-[#DADADA]
        placeholder-gray-400
        focus:outline-none
        focus:border-[#2B5F44]
        transition-colors
        duration-300
        ${className}
      `}
      />
      <p className="text-red-500 text-sm">{errorMsg}</p>
    </div>
  )
}

export default CustomInput
