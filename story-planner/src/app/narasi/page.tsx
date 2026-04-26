'use client'
import { useState, useEffect } from 'react'
import { Plus, X, ChevronDown, ChevronUp, Trash2, Edit2 } from 'lucide-react'
import AppLayout from '@/components/layout/AppLayout'
import { NarasiScene } from '@/lib/types'
import { subscribeNarasi, addNarasi, updateNarasi, deleteNarasi } from '@/lib/db'

export default function NarasiPage() {
  const [items, setItems] = useState<NarasiScene[]>([])
  const [modal, setModal] = useState<{ open: boolean; item?: NarasiScene }>({ open: false })
  const [expanded, setExpanded] = useState<string | null>(null)
  const [form, setForm] = useState({ title: '', narasi: '', scene: '', contentId: '' })

  useEffect(() => { const u = subscribeNarasi(setItems); return () => u() }, [])

  const openAdd = () => { setForm({ title: '', narasi: '', scene: '', contentId: '' }); setModal({ open: true }) }
  const openEdit = (item: NarasiScene) => { setForm({ title: item.title, narasi: item.narasi, scene: item.scene, contentId: item.contentId || '' }); setModal({ open: true, item }) }
  const close = () => setModal({ open: false })

  const save = async () => {
    if (!form.title.trim()) return
    const now = Date.now()
    if (modal.item) {
      await updateNarasi(modal.item.id, { ...form, updatedAt: now })
    } else {
      await addNarasi({ ...form, order: items.length, createdAt: now, updatedAt: now })
    }
    close()
  }

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl font-semibold" style={{ color: 'var(--ink)' }}>Narasi & Scene</h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--muted)' }}>{items.length} scene tersimpan</p>
          </div>
          <button onClick={openAdd} className="btn-primary"><Plus size={16} />Tambah Scene</button>
        </div>

        {items.length === 0 ? (
          <div className="card text-center py-16">
            <p className="font-display text-lg mb-2" style={{ color: 'var(--muted)' }}>Belum ada narasi</p>
            <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>Mulai tulis narasi dan scene untuk konten kamu</p>
            <button onClick={openAdd} className="btn-primary mx-auto"><Plus size={16} />Buat Scene Pertama</button>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={item.id} className="card">
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: 'var(--cream)', color: 'var(--muted)' }}>{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm truncate" style={{ color: 'var(--ink)' }}>{item.title}</h3>
                    {!expanded !== !(expanded === item.id) && (
                      <p className="text-xs truncate mt-0.5" style={{ color: 'var(--muted)' }}>{item.narasi}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openEdit(item)} className="btn-ghost p-1.5"><Edit2 size={14} /></button>
                    <button onClick={() => setExpanded(expanded === item.id ? null : item.id)} className="btn-ghost p-1.5">
                      {expanded === item.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                  </div>
                </div>
                {expanded === item.id && (
                  <div className="mt-4 pt-4 grid grid-cols-2 gap-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <div>
                      <p className="text-xs font-semibold mb-2 tracking-wide" style={{ color: 'var(--muted)' }}>NARASI</p>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--ink)' }}>{item.narasi || '-'}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2 tracking-wide" style={{ color: 'var(--muted)' }}>SCENE / VISUAL</p>
                      <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--ink)' }}>{item.scene || '-'}</p>
                    </div>
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
              <h2 className="font-display text-lg font-semibold">{modal.item ? 'Edit Scene' : 'Tambah Scene'}</h2>
              <button onClick={close} className="btn-ghost p-1.5"><X size={18} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Judul Scene *</label>
                <input className="input-field" placeholder="Scene 1 - Pembukaan" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Narasi / Script</label>
                <textarea className="textarea-field" rows={5} placeholder="Tulis narasi atau script di sini..." value={form.narasi} onChange={e => setForm(p => ({ ...p, narasi: e.target.value }))} />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--muted)' }}>Deskripsi Scene / Visual</label>
                <textarea className="textarea-field" rows={4} placeholder="Gambarkan visual scene ini..." value={form.scene} onChange={e => setForm(p => ({ ...p, scene: e.target.value }))} />
              </div>
              <div className="flex gap-2 pt-2">
                {modal.item && (
                  <button onClick={async () => { await deleteNarasi(modal.item!.id); close() }}
                    className="px-4 py-2 rounded-lg text-sm font-medium" style={{ background: '#fce8e4', color: 'var(--accent)' }}>
                    Hapus
                  </button>
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
