'use client'
import { useState, useEffect } from 'react'
import { Plus, X, Copy, Check, Youtube, Zap, Edit2, Trash2 } from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import { CaptionDraft, ContentType } from '@/lib/types'
import { subscribeCaptions, addCaption, updateCaption, deleteCaption } from '@/lib/db'

export default function CaptionPage() {
  const [items, setItems] = useState<CaptionDraft[]>([])
  const [modal, setModal] = useState<{ open: boolean; item?: CaptionDraft }>({ open: false })
  const [copied, setCopied] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', caption: '', hashtags: '', platform: 'youtube' as ContentType })

  useEffect(() => { const u = subscribeCaptions(setItems); return () => u() }, [])

  const openAdd = () => { setForm({ title: '', caption: '', hashtags: '', platform: 'youtube' }); setModal({ open: true }) }
  const openEdit = (item: CaptionDraft) => { setForm({ title: item.title, caption: item.caption, hashtags: item.hashtags, platform: item.platform }); setModal({ open: true, item }) }
  const close = () => setModal({ open: false })

  const save = async () => {
    if (!form.title.trim()) return
    const now = Date.now()
    if (modal.item) {
      await updateCaption(modal.item.id, { ...form, updatedAt: now })
    } else {
      await addCaption({ ...form, createdAt: now, updatedAt: now })
    }
    close()
  }

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Caption Draft</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{items.length} caption tersimpan</p>
          </div>
          <button onClick={openAdd} className="btn-primary"><Plus size={16} />Tambah Caption</button>
        </div>

        {items.length === 0 ? (
          <div className="card text-center py-16">
            <p className="font-display text-lg mb-2" style={{ color: 'var(--muted)' }}>Belum ada caption</p>
            <button onClick={openAdd} className="btn-primary mx-auto"><Plus size={16} />Buat Caption</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {items.map(item => (
              <div key={item.id} className="card group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-sm" style={{ color: 'var(--ink)' }}>{item.title}</h3>
                    <span className="badge mt-1" style={{ background: item.platform === 'youtube' ? '#fce8e4' : '#e4eefe', color: item.platform === 'youtube' ? '#c84b2f' : '#2563eb' }}>
                      {item.platform === 'youtube' ? <Youtube size={10} className="mr-1" /> : <Zap size={10} className="mr-1" />}
                      {item.platform === 'youtube' ? 'YouTube' : 'Shorts'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(item)} className="btn-ghost p-1.5"><Edit2 size={14} /></button>
                    <button onClick={() => deleteCaption(item.id)} className="btn-ghost p-1.5"><Trash2 size={14} /></button>
                  </div>
                </div>
                <div className="rounded-lg p-3 mb-3 relative" style={{ background: 'var(--paper)' }}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap pr-8" style={{ color: 'var(--ink)' }}>{item.caption}</p>
                  <button onClick={() => copy(item.caption, item.id + '-cap')}
                    className="absolute top-2 right-2 p-1.5 rounded-md transition-all"
                    style={{ color: 'var(--muted)', background: 'var(--cream)' }}>
                    {copied === item.id + '-cap' ? <Check size={13} style={{ color: '#16a34a' }} /> : <Copy size={13} />}
                  </button>
                </div>
                {item.hashtags && (
                  <div className="rounded-lg p-3 relative" style={{ background: '#e4eefe' }}>
                    <p className="text-xs pr-8" style={{ color: '#2563eb' }}>{item.hashtags}</p>
                    <button onClick={() => copy(item.hashtags, item.id + '-hash')}
                      className="absolute top-2 right-2 p-1.5 rounded-md"
                      style={{ color: '#2563eb', background: 'rgba(255,255,255,0.5)' }}>
                      {copied === item.id + '-hash' ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {modal.open && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && close()}>
          <div className="modal-box">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-semibold">{modal.item ? 'Edit Caption' : 'Tambah Caption'}</h2>
              <button onClick={close} className="btn-ghost p-1.5"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Judul *</label>
                <input className="input-field" placeholder="Nama caption ini..." value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Platform</label>
                <select className="input-field" value={form.platform} onChange={e => setForm(p => ({ ...p, platform: e.target.value as ContentType }))}>
                  <option value="youtube">YouTube</option>
                  <option value="shorts">Shorts</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Caption</label>
                <textarea className="textarea-field" rows={6} placeholder="Tulis caption di sini..." value={form.caption} onChange={e => setForm(p => ({ ...p, caption: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Hashtags</label>
                <textarea className="textarea-field" rows={3} placeholder="#youtube #konten #vlog" value={form.hashtags} onChange={e => setForm(p => ({ ...p, hashtags: e.target.value }))} />
              </div>
              <div className="flex gap-2 pt-2">
                {modal.item && (
                  <button onClick={async () => { await deleteCaption(modal.item!.id); close() }}
                    className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: '#fce8e4', color: 'var(--accent)' }}>Hapus</button>
                )}
                <div className="flex-1" />
                <button onClick={close} className="btn-ghost">Batal</button>
                <button onClick={save} className="btn-primary">Simpan</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}
