'use client'
import { useState, useEffect } from 'react'
import { Plus, X, Lightbulb, Youtube, Zap, Trash2 } from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import { IdeaItem, ContentType } from '@/lib/types'
import { subscribeIdeas, addIdea, deleteIdea, updateIdea } from '@/lib/db'
import clsx from 'clsx'

const PRIORITY_COLOR = { rendah: '#dcfce7', tinggi: '#fce8e4', sedang: '#fef3c7' }
const PRIORITY_TEXT = { rendah: '#16a34a', tinggi: '#c84b2f', sedang: '#d97706' }

export default function IdeasPage() {
  const [items, setItems] = useState<IdeaItem[]>([])
  const [modal, setModal] = useState(false)
  const [filter, setFilter] = useState<'all' | ContentType>('all')
  const [form, setForm] = useState({ title: '', description: '', type: 'youtube' as ContentType, priority: 'sedang' as IdeaItem['priority'], tags: '' })

  useEffect(() => { const u = subscribeIdeas(setItems); return () => u() }, [])

  const filtered = filter === 'all' ? items : items.filter(i => i.type === filter)

  const save = async () => {
    if (!form.title.trim()) return
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    await addIdea({ ...form, tags, createdAt: Date.now() })
    setModal(false)
    setForm({ title: '', description: '', type: 'youtube', priority: 'sedang', tags: '' })
  }

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Ideas Board</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{items.length} ide tersimpan</p>
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
            <button onClick={() => setModal(true)} className="btn-primary"><Plus size={16} />Tambah Ide</button>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <Lightbulb size={32} className="mx-auto mb-3" style={{ color: 'var(--muted)' }} />
            <p className="font-display text-lg mb-2" style={{ color: 'var(--muted)' }}>Belum ada ide</p>
            <button onClick={() => setModal(true)} className="btn-primary mx-auto"><Plus size={16} />Catat Ide</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(item => (
              <div key={item.id} className="card group relative">
                <div className="flex items-start justify-between mb-3">
                  <span className="badge" style={{ background: item.type === 'youtube' ? '#fce8e4' : '#e4eefe', color: item.type === 'youtube' ? '#c84b2f' : '#2563eb' }}>
                    {item.type === 'youtube' ? <Youtube size={10} className="mr-1" /> : <Zap size={10} className="mr-1" />}
                    {item.type === 'youtube' ? 'YouTube' : 'Shorts'}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="badge" style={{ background: PRIORITY_COLOR[item.priority], color: PRIORITY_TEXT[item.priority] }}>
                      {item.priority}
                    </span>
                    <button onClick={() => deleteIdea(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-md transition-all"
                      style={{ color: 'var(--muted)' }}>
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
                <h3 className="font-medium text-sm mb-2" style={{ color: 'var(--ink)' }}>{item.title}</h3>
                {item.description && <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>{item.description}</p>}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'var(--cream)', color: 'var(--muted)' }}>#{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setModal(false)}>
          <div className="modal-box">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-semibold">Tambah Ide</h2>
              <button onClick={() => setModal(false)} className="btn-ghost p-1.5"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Judul Ide *</label>
                <input className="input-field" placeholder="Judul ide konten..." value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Deskripsi</label>
                <textarea className="textarea-field" rows={3} placeholder="Jelaskan ide ini..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
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
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Prioritas</label>
                  <select className="input-field" value={form.priority} onChange={e => setForm(p => ({ ...p, priority: e.target.value as IdeaItem['priority'] }))}>
                    <option value="rendah">Rendah</option>
                    <option value="sedang">Sedang</option>
                    <option value="tinggi">Tinggi</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Tags</label>
                <input className="input-field" placeholder="vlog, tips, tutorial" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setModal(false)} className="btn-ghost">Batal</button>
                <button onClick={save} className="btn-primary">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
