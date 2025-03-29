import HeaderMenu from '@/components/Header'
import SideMenu from '@/components/SideMenu'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-h-screen bg-gray-100">
      <HeaderMenu />
      <div className="flex flex-1 mt-[60px]  max-h-screen">
        <SideMenu />
        <div className="flex-1 lg:ml-[280px] ml-0">{children}</div>
      </div>
    </div>
  )
}
