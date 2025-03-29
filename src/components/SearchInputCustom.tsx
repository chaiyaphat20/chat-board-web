import React, { InputHTMLAttributes } from 'react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInputCustom: React.FC<SearchInputProps> = ({ className, ...rest }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search"
        className="
          w-full 
          pl-10 
          pr-4 
          py-2 
          bg-transparent
          border 
          border-[#D8E9E4]
          rounded-lg 
          text-gray-700 
          focus:outline-none 
          focus:ring-2 
          focus:ring-gray-300
        "
        {...rest}
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
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
      </div>
    </div>
  )
}

export default SearchInputCustom
