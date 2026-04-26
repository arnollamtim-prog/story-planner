'use client'
import { useState, useEffect } from 'react'
import { Plus, X, Copy, Check, Trash2, Tag } from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import { PromptItem } from '@/lib/types'
import { subscribePrompts, addPrompt, deletePrompt } from '@/lib/db'

const CATEGORIES = ['Thumbnail', 'Script', 'Hook', 'CTA', 'Deskripsi', 'Judul', 'Lainnya']

export default function PromptVaultPage() {
  const [items, setItems] = useState<PromptItem[]>([])
  const [modal, setModal] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [filterCat, setFilterCat] = useState('all')
  const [form, setForm] = useState({ title: '', prompt: '', category: 'Lainnya', tags: '' })

  useEffect(() => { const u = subscribePrompts(setItems); return () => u() }, [])

  const filtered = filterCat === 'all' ? items : items.filter(i => i.category === filterCat)

  const save = async () => {
    if (!form.title.trim() || !form.prompt.trim()) return
    const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean)
    await addPrompt({ ...form, tags, createdAt: Date.now() })
    setModal(false)
    setForm({ title: '', prompt: '', category: 'Lainnya', tags: '' })
  }

  const copy = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const cats = ['all', ...CATEGORIES]

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Prompt Vault</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{items.length} prompt tersimpan</p>
          </div>
          <button onClick={() => setModal(true)} className="btn-primary"><Plus size={16} />Simpan Prompt</button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-5">
          {cats.map(c => (
            <button key={c} onClick={() => setFilterCat(c)}
              className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
              style={filterCat === c
                ? { background: 'var(--ink)', color: 'white' }
                : { background: 'var(--cream)', color: 'var(--muted)' }}>
              {c === 'all' ? 'Semua' : c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="card text-center py-16">
            <p className="font-display text-lg mb-2" style={{ color: 'var(--muted)' }}>Belum ada prompt</p>
            <button onClick={() => setModal(true)} className="btn-primary mx-auto"><Plus size={16} />Simpan Prompt</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map(item => (
              <div key={item.id} className="card group">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-sm" style={{ color: 'var(--ink)' }}>{item.title}</h3>
                    <span className="badge mt-1" style={{ background: 'var(--cream)', color: 'var(--muted)' }}>
                      <Tag size={10} className="mr-1" />{item.category}
                    </span>
                  </div>
                  <button onClick={() => deletePrompt(item.id)} className="opacity-0 group-hover:opacity-100 btn-ghost p-1.5"><Trash2 size={14} /></button>
                </div>
                <div className="rounded-lg p-3 relative mt-3" style={{ background: 'var(--paper)' }}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap pr-8" style={{ color: 'var(--ink)', fontFamily: 'monospace', fontSize: '12px' }}>{item.prompt}</p>
                  <button onClick={() => copy(item.prompt, item.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-md" style={{ background: 'var(--cream)', color: 'var(--muted)' }}>
                    {copied === item.id ? <Check size={13} style={{ color: '#16a34a' }} /> : <Copy size={13} />}
                  </button>
                </div>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'var(--cream)', color: 'var(--muted)' }}>#{t}</span>)}
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
              <h2 className="font-display text-lg font-semibold">Simpan Prompt</h2>
              <button onClick={() => setModal(false)} className="btn-ghost p-1.5"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Nama Prompt *</label>
                <input className="input-field" placeholder="Nama prompt ini..." value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Kategori</label>
                <select className="input-field" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Prompt *</label>
                <textarea className="textarea-field" rows={6} placeholder="Isi prompt di sini..." value={form.prompt} onChange={e => setForm(p => ({ ...p, prompt: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Tags</label>
                <input className="input-field" placeholder="ai, midjourney, chatgpt" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} />
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
