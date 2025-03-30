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
import DeleteConfirmationModal from './components/DeleteConfirmationModal'

export default function OurBLog() {
  const router = useRouter()
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
    setDeleteShowModal,
    showDeleteModal,
    deletePostById,
  } = useOurBlog()

  const handleClick = (postId: string) => {
    router.push(`/home/${postId}`)
  }

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
                setSelectedPost(post)
                setDeleteShowModal(true)
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
        onPost={({ category, content, title }) => {
          createPost(category, title, content)
        }}
      />

      {selectedPost && (
        <CreatePostModal
          postData={selectedPost}
          isOpen={editShowModal}
          onClose={() => {
            setEditShowModal(false)
          }}
          onPost={({ category, content, title }) => {
            const body: UpdatePostBody = {
              category,
              content,
              topic: title,
            }
            updatePost('' + selectedPost.id, body)
          }}
        />
      )}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setDeleteShowModal(false)
        }}
        onDelete={() => {
          deletePostById('' + selectedPost?.id)
        }}
      />
    </div>
  )
}
