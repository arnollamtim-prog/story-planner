'use client'
import Sidebar from './Sidebar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-[240px] min-h-screen" style={{ background: 'var(--paper)' }}>
        {children}
      </main>
    </div>
  )
}
