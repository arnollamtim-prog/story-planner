'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Users,
  BarChart2,
  Settings,
  LogOut,
  Layers,
} from 'lucide-react'

const NAV = [
  {
    group: 'Menu',
    items: [
      { label: 'Overview',   href: '/',           icon: LayoutDashboard },
      { label: 'Stories',    href: '/stories',    icon: BookOpen,  badge: null },
      { label: 'Calendar',   href: '/calendar',   icon: Calendar,  badge: null },
      { label: 'Characters', href: '/characters', icon: Users,     badge: null },
      { label: 'Analytics',  href: '/analytics',  icon: BarChart2, badge: 'New' },
    ],
  },
  {
    group: 'System',
    items: [
      { label: 'Settings', href: '/settings', icon: Settings },
      { label: 'Logout',   href: '/logout',   icon: LogOut },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 h-screen flex flex-col z-40 overflow-hidden"
      style={{
        width: 'var(--sidebar-w)',
        background: 'var(--sidebar-bg)',
      }}
    >
      {/* Ambient glow top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.14), transparent 70%)' }}
      />

      {/* ── Logo ── */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-8">
        <div
          className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--grad)' }}
        >
          <Layers size={15} color="white" strokeWidth={2.2} />
        </div>
        <span
          className="text-white text-[15px] tracking-tight"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}
        >
          Story Planner
        </span>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 overflow-y-auto space-y-6">
        {NAV.map((section) => (
          <div key={section.group}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold tracking-[1.2px] uppercase text-slate-500">
              {section.group}
            </p>

            <ul className="space-y-0.5">
              {section.items.map(({ label, href, icon: Icon, badge }) => {
                const active = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className="group relative flex items-center gap-2.5 px-3 py-[9px] rounded-xl text-[13.5px] font-normal transition-all duration-200"
                      style={{
                        color:      active ? 'white'    : '#94A3B8',
                        background: active ? 'rgba(59,130,246,0.18)' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!active) {
                          e.currentTarget.style.color      = '#E2E8F0'
                          e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!active) {
                          e.currentTarget.style.color      = '#94A3B8'
                          e.currentTarget.style.background = 'transparent'
                        }
                      }}
                    >
                      {/* Sliding active indicator */}
                      {active && (
                        <span
                          className="absolute left-0 top-[6px] bottom-[6px] w-[3px] rounded-r-full"
                          style={{ background: 'var(--grad)' }}
                        />
                      )}

                      <Icon
                        size={15}
                        strokeWidth={active ? 2.2 : 1.8}
                        style={{ opacity: active ? 1 : 0.75, flexShrink: 0 }}
                      />

                      <span className="flex-1">{label}</span>

                      {badge && (
                        <span
                          className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ background: 'rgba(59,130,246,0.3)', color: '#93C5FD' }}
                        >
                          {badge}
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* ── User footer ── */}
      <div className="p-3 mt-auto">
        <div
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold text-white flex-shrink-0"
            style={{ background: 'var(--grad)' }}
          >
            SP
          </div>
          <div className="overflow-hidden">
            <p className="text-[12.5px] text-slate-200 font-medium leading-tight truncate">
              Story Planner
            </p>
            <p className="text-[11px] text-slate-500 truncate">Pro Plan</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
