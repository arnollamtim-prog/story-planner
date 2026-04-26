'use client'
import { useState, useEffect } from 'react'
import { Plus, X, Lightbulb, Youtube, Zap, Trash2 } from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import { IdeaItem, ContentType } from '@/lib/types'
import { subscribeIdeas, addIdea, deleteIdea } from '@/lib/db'

const PRIORITY = {
  rendah: { bg: 'rgba(167,243,208,0.3)', text: '#059669' },
  sedang: { bg: 'rgba(251,191,36,0.12)', text: '#D97706' },
  tinggi: { bg: 'rgba(239,68,68,0.08)',  text: '#EF4444' },
}

export default function IdeasPage() {
  const [items, setItems]   = useState<IdeaItem[]>([])
  const [modal, setModal]   = useState(false)
  const [filter, setFilter] = useState<'all' | ContentType>('all')
  const [form, setForm]     = useState({
    title: '', description: '',
    type: 'youtube' as ContentType,
    priority: 'sedang' as IdeaItem['priority'],
    tags: '',
  })

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
      <div className="p-6 animate-fade-up">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-2xl tracking-tight"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)' }}
            >
              Ideas Board
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-2)' }}>
              {items.length} ide tersimpan
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter tabs */}
            <div
              className="flex items-center gap-1 p-1 rounded-xl"
              style={{ background: 'var(--border)' }}
            >
              {(['all', 'youtube', 'shorts'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
                  style={
                    filter === f
                      ? { background: 'var(--card)', color: 'var(--text)', boxShadow: 'var(--shadow)' }
                      : { color: 'var(--text-2)' }
                  }
                >
                  {f === 'all' ? 'Semua' : f === 'youtube' ? 'YouTube' : 'Shorts'}
                </button>
              ))}
            </div>
            <button onClick={() => setModal(true)} className="btn-primary">
              <Plus size={15} /> Tambah Ide
            </button>
          </div>
        </div>

        {/* ── Empty state ── */}
        {filtered.length === 0 ? (
          <div
            className="rounded-2xl text-center py-20 transition-all"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ background: 'rgba(59,130,246,0.08)' }}
            >
              <Lightbulb size={22} style={{ color: 'var(--primary)' }} />
            </div>
            <p
              className="text-base mb-1"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)' }}
            >
              Belum ada ide
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-2)' }}>
              Catat ide konten lo sebelum keburu lupa
            </p>
            <button onClick={() => setModal(true)} className="btn-primary mx-auto">
              <Plus size={15} /> Catat Ide
            </button>
          </div>
        ) : (
          /* ── Cards grid ── */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((item, idx) => (
              <div
                key={item.id}
                className="group relative rounded-2xl p-5 transition-all duration-200"
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  animationDelay: `${idx * 0.05}s`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-hover)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
                  ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
                }}
              >
                {/* Top row: type badge + priority + delete */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                    style={
                      item.type === 'youtube'
                        ? { background: 'rgba(59,130,246,0.1)',  color: '#3B82F6' }
                        : { background: 'rgba(34,211,238,0.12)', color: '#0891B2' }
                    }
                  >
                    {item.type === 'youtube'
                      ? <Youtube size={10} />
                      : <Zap     size={10} />
                    }
                    {item.type === 'youtube' ? 'YouTube' : 'Shorts'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <span
                      className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium"
                      style={{
                        background: PRIORITY[item.priority].bg,
                        color:      PRIORITY[item.priority].text,
                      }}
                    >
                      {item.priority}
                    </span>
                    <button
                      onClick={() => deleteIdea(item.id)}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg transition-all duration-150 hover:scale-110"
                      style={{ color: 'var(--text-3)', background: 'rgba(239,68,68,0.06)' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="text-sm font-medium mb-2 leading-snug"
                  style={{ color: 'var(--text)' }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                {item.description && (
                  <p
                    className="text-xs leading-relaxed mb-3"
                    style={{ color: 'var(--text-2)' }}
                  >
                    {item.description}
                  </p>
                )}

                {/* Tags */}
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{ background: 'rgba(59,130,246,0.06)', color: 'var(--text-2)' }}
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {modal && (
        <div
          className="modal-overlay"
          onClick={e => e.target === e.currentTarget && setModal(false)}
        >
          <div className="modal-box">
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-lg"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--text)' }}
              >
                Tambah Ide
              </h2>
              <button onClick={() => setModal(false)} className="btn-ghost p-1.5">
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>
                  Judul Ide *
                </label>
                <input
                  className="input-field"
                  placeholder="Judul ide konten..."
                  value={form.title}
                  onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>
                  Deskripsi
                </label>
                <textarea
                  className="textarea-field"
                  rows={3}
                  placeholder="Jelaskan ide ini..."
                  value={form.description}
                  onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>
                    Tipe
                  </label>
                  <select
                    className="input-field"
                    value={form.type}
                    onChange={e => setForm(p => ({ ...p, type: e.target.value as ContentType }))}
                  >
                    <option value="youtube">YouTube</option>
                    <option value="shorts">Shorts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>
                    Prioritas
                  </label>
                  <select
                    className="input-field"
                    value={form.priority}
                    onChange={e => setForm(p => ({ ...p, priority: e.target.value as IdeaItem['priority'] }))}
                  >
                    <option value="rendah">Rendah</option>
                    <option value="sedang">Sedang</option>
                    <option value="tinggi">Tinggi</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-2)' }}>
                  Tags (pisah dengan koma)
                </label>
                <input
                  className="input-field"
                  placeholder="vlog, tips, tutorial"
                  value={form.tags}
                  onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                />
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
