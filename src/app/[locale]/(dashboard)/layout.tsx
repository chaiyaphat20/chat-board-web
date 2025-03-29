import HeaderMenu from '@/components/Header'
import SideMenu from '@/components/SideMenu'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderMenu />
      <div className="flex">
        <SideMenu />
        {children}
      </div>
    </div>
  )
}
