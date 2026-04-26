'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Calendar, FileText, Lightbulb, MessageSquare, Lock, BookOpen, Layers } from 'lucide-react'
import clsx from 'clsx'

const nav = [
  { label: 'KONTEN', items: [
    { href: '/', icon: Calendar, label: 'Kalender' },
    { href: '/narasi', icon: FileText, label: 'Narasi & Scene' },
    { href: '/ideas', icon: Lightbulb, label: 'Ideas Board' },
    { href: '/caption', icon: MessageSquare, label: 'Caption Draft' },
  ]},
  { label: 'ASET', items: [
    { href: '/prompt-vault', icon: Lock, label: 'Prompt Vault' },
  ]},
  { label: 'ANALITIK', items: [
    { href: '/jurnal', icon: BookOpen, label: 'Jurnal Analisis' },
  ]},
]

export default function Sidebar() {
  const path = usePathname()
  return (
    <aside className="fixed left-0 top-0 h-screen w-[240px] flex flex-col z-30"
      style={{ background: 'white', borderRight: '1px solid var(--border)' }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--ink)' }}>
            <Layers size={16} color="white" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm leading-tight" style={{ color: 'var(--ink)' }}>Story Planner</p>
            <p className="text-xs" style={{ color: 'var(--muted)' }}>YouTube & Shorts</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {nav.map(section => (
          <div key={section.label}>
            <p className="px-2 mb-1.5 text-[10px] font-semibold tracking-widest" style={{ color: 'var(--muted)' }}>
              {section.label}
            </p>
            {section.items.map(item => {
              const active = path === item.href
              return (
                <Link key={item.href} href={item.href}
                  className={clsx('flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all mb-0.5',
                    active ? 'text-white' : 'hover:bg-[var(--cream)]')}
                  style={active ? { background: 'var(--ink)', color: 'white' } : { color: 'var(--muted)' }}>
                  <item.icon size={16} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-3 border-t text-xs" style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
          Terhubung
        </div>
      </div>
    </aside>
  )
}
