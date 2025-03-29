import CustomButton from '@/components/CustomButton'
import authOptions from '@/libs/auth'
import { useSession } from 'next-auth/react'

export default function Home() {
  return (
    <div className="w-full min-h-[calc(100vh-60px)] overflow-hidden flex flex-col px-16">
      <header className="min-h-[40px] flex items-center mt-[48px] justify-between">
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
        <div className="flex flex-row items-center gap-1.5">
          <h2>Category</h2>
          <CustomButton variant="success">
            <p className="text-white font-bold">Create +</p>
          </CustomButton>
        </div>
      </header>
      {/* Section ที่สามารถ Scroll ได้ */}
      <section className="flex-1  rounded-2xl w-full  bg-amber-200"></section>
    </div>
  )
}
