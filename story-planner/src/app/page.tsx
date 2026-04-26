'use client'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Plus, X, Youtube, Zap } from 'lucide-react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, startOfWeek, endOfWeek } from 'date-fns'
import { id } from 'date-fns/locale'
import AppLayout from '@/components/layout/AppLayout'
import { ContentItem, ContentType, ContentStatus } from '@/lib/types'
import { subscribeContent, addContent, updateContent, deleteContent } from '@/lib/db'

const DAYS = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB']
const STATUS_OPTS: ContentStatus[] = ['ide', 'draft', 'produksi', 'selesai']

export default function KalenderPage() {
  const [current, setCurrent] = useState(new Date())
  const [items, setItems] = useState<ContentItem[]>([])
  const [modal, setModal] = useState<{ open: boolean; date?: string; item?: ContentItem }>({ open: false })
  const [filter, setFilter] = useState<'all' | ContentType>('all')
  const [form, setForm] = useState({ title: '', type: 'youtube' as ContentType, status: 'ide' as ContentStatus, description: '', tags: '' })

  useEffect(() => {
    const unsub = subscribeContent(setItems)
    return () => unsub()
  }, [])

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(current), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(current), { weekStartsOn: 0 })
  })

  const openAdd = (date: string) => {
    setForm({ title: '', type: 'youtube', status: 'ide', description: '', tags: '' })
    setModal({ open: true, date })
  }
  const openEdit = (item: ContentItem) => {
    setForm({ title: item.title, type: item.type, status: item.status, description: item.description || '', tags: item.tags?.join(', ') || '' })
    setModal({ open: true, item })
  }
  const closeModal = () => setModal({ open: false })

  const save = async () => {
    if (!form.title.trim()) return
    const now = Date.now()
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    if (modal.item) {
      await updateContent(modal.item.id, { ...form, tags, updatedAt: now })
    } else {
      await addContent({ ...form, tags, date: modal.date!, createdAt: now, updatedAt: now })
    }
    closeModal()
  }

  const filtered = (date: string) => items.filter(i => i.date === date && (filter === 'all' || i.type === filter))

  return (
    <AppLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrent(subMonths(current, 1))} className="btn-ghost p-2"><ChevronLeft size={18} /></button>
            <h1 className="font-display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>
              {format(current, 'MMMM yyyy', { locale: id })}
            </h1>
            <button onClick={() => setCurrent(addMonths(current, 1))} className="btn-ghost p-2"><ChevronRight size={18} /></button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg p-1" style={{ background: 'var(--cream)' }}>
              {(['all', 'youtube', 'shorts'] as const).map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="px-3 py-1 rounded-md text-xs font-medium transition-all"
                  style={filter === f ? { background: 'white', color: 'var(--ink)', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' } : { color: 'var(--muted)' }}>
                  {f === 'all' ? 'Semua' : f === 'youtube' ? 'YouTube' : 'Shorts'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid var(--border)' }}>
          {/* Day headers */}
          <div className="grid grid-cols-7">
            {DAYS.map(d => (
              <div key={d} className="py-3 text-center text-xs font-semibold tracking-widest" style={{ color: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>{d}</div>
            ))}
          </div>
          {/* Days grid */}
          <div className="grid grid-cols-7">
            {days.map((day, i) => {
              const dateStr = format(day, 'yyyy-MM-dd')
              const dayItems = filtered(dateStr)
              const isToday = isSameDay(day, new Date())
              const inMonth = isSameMonth(day, current)
              return (
                <div key={i} className="min-h-[110px] p-2 group relative transition-colors"
                  style={{ borderRight: (i + 1) % 7 !== 0 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)', background: inMonth ? 'white' : 'var(--paper)' }}>
                  <div className="flex items-start justify-between mb-1">
                    <span className={`text-sm w-7 h-7 flex items-center justify-center rounded-full font-medium ${!inMonth ? 'opacity-30' : ''}`}
                      style={isToday ? { background: 'var(--accent)', color: 'white', fontWeight: 700 } : { color: 'var(--ink)' }}>
                      {format(day, 'd')}
                    </span>
                    {inMonth && (
                      <button onClick={() => openAdd(dateStr)}
                        className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-md flex items-center justify-center transition-all"
                        style={{ background: 'var(--cream)', color: 'var(--muted)' }}>
                        <Plus size={12} />
                      </button>
                    )}
                  </div>
                  <div className="space-y-1">
                    {dayItems.slice(0, 3).map(item => (
                      <button key={item.id} onClick={() => openEdit(item)}
                        className="w-full text-left px-2 py-1 rounded-md text-xs font-medium truncate transition-all hover:opacity-80"
                        style={item.type === 'youtube' ? { background: '#fce8e4', color: '#c84b2f' } : { background: '#e4eefe', color: '#2563eb' }}>
                        {item.type === 'youtube' ? <Youtube size={10} className="inline mr-1" /> : <Zap size={10} className="inline mr-1" />}
                        {item.title}
                      </button>
                    ))}
                    {dayItems.length > 3 && (
                      <p className="text-xs px-1" style={{ color: 'var(--muted)' }}>+{dayItems.length - 3} lagi</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="modal-box">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-semibold">{modal.item ? 'Edit Konten' : 'Tambah Konten'}</h2>
              <button onClick={closeModal} className="btn-ghost p-1.5"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Judul *</label>
                <input className="input-field" placeholder="Judul konten..." value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Tipe</label>
                  <select className="input-field" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value as ContentType }))}>
                    <option value="youtube">YouTube</option>
                    <option value="shorts">Shorts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Status</label>
                  <select className="input-field" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value as ContentStatus }))}>
                    {STATUS_OPTS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Deskripsi</label>
                <textarea className="textarea-field" rows={3} placeholder="Deskripsi singkat..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Tags (pisah dengan koma)</label>
                <input className="input-field" placeholder="vlog, tips, tutorial" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} />
              </div>
              <div className="flex gap-2 pt-2">
                {modal.item && (
                  <button onClick={async () => { await deleteContent(modal.item!.id); closeModal() }}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    style={{ background: '#fce8e4', color: 'var(--accent)' }}>
                    Hapus
                  </button>
                )}
                <div className="flex-1" />
                <button onClick={closeModal} className="btn-ghost">Batal</button>
                <button onClick={save} className="btn-primary">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
