'use client'

import CustomButton from '@/components/CustomButton'
import CardChat from './components/CardChat'
import { useRouter } from 'next/navigation'
import Dropdown from '@/components/Dropdown'
import { CATEGORY } from '@/constants/constants'
import SearchInputCustom from '@/components/SearchInputCustom'
import { useOurBlog } from './hooks/usePosts'
import CreatePostModal from '../home/components/CreatePostModal'
import { UpdatePostBody } from '@/libs/api/post/update-post'

export default function Home() {
  const {
    postFilter,
    setCategory,
    search,
    setSearch,
    showCreateModal,
    setShowCreateModal,
    setEditShowModal,
    editShowModal,
    createPost,
    selectedPost,
    setSelectedPost,
    updatePost,
  } = useOurBlog()

  const router = useRouter()

  const handleClick = (postId: string) => {}

  return (
    <div className="w-full min-h-[calc(100vh-60px)]  overflow-hidden flex flex-col px-4 lg:px-[40px] bg-[#BBC2C0] ">
      <header className="min-h-[40px] flex flex-col lg:flex-row gap-4 items-center mt-[48px] justify-between bg-red top-[60px]">
        <SearchInputCustom
          value={search}
          onChange={event => {
            event.preventDefault()
            const value = event.target.value
            setSearch(value)
          }}
        />
        <div className="flex flex-row items-center gap-1.5">
          <Dropdown options={CATEGORY} onSelect={setCategory} isHideBg placeholder="Community" />
          <CustomButton
            variant="success"
            onClick={() => {
              setShowCreateModal(true)
            }}
          >
            <p className="text-white font-bold">Create +</p>
          </CustomButton>
        </div>
      </header>
      <section className="flex-1  rounded-2xl w-full  bg-white mt-6 ">
        {postFilter.map((post, index) => {
          return (
            <CardChat
              isRoundFirst={index === 0}
              isRoundLast={index === postFilter.length - 1}
              key={index}
              post={post}
              onClickEdit={post => {
                setSelectedPost(post)
                setEditShowModal(true)
              }}
              onClickDelete={post => {
                console.log({ post })
              }}
            />
          )
        })}
        {postFilter.length === 0 ? (
          <div className="mt-10 ml-4">
            <p>Not Found data...</p>
          </div>
        ) : (
          <></>
        )}
      </section>

      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false)
        }}
        onPost={({ community, content, title }) => {
          createPost(community, title, content)
        }}
      />

      {selectedPost && (
        <CreatePostModal
          postData={selectedPost}
          isOpen={editShowModal}
          onClose={() => {
            setEditShowModal(false)
          }}
          onPost={({ community, content, title }) => {
            const body: UpdatePostBody = {
              category: community,
              content,
              topic: title,
            }
            updatePost('' + selectedPost.id, body)
          }}
        />
      )}
    </div>
  )
}
