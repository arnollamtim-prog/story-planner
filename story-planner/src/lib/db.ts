import {
  collection, doc, getDocs, addDoc, updateDoc, deleteDoc,
  query, orderBy, onSnapshot, Unsubscribe, setDoc
} from 'firebase/firestore';
import { db } from './firebase';
import { ContentItem, NarasiScene, IdeaItem, CaptionDraft, PromptItem, JurnalEntry } from './types';

// ── CONTENT (Kalender) ──────────────────────────────────────────
export const subscribeContent = (cb: (items: ContentItem[]) => void): Unsubscribe =>
  onSnapshot(query(collection(db, 'content'), orderBy('date')), snap =>
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as ContentItem))));

export const addContent = (data: Omit<ContentItem, 'id'>) =>
  addDoc(collection(db, 'content'), data);

export const updateContent = (id: string, data: Partial<ContentItem>) =>
  updateDoc(doc(db, 'content', id), { ...data, updatedAt: Date.now() });

export const deleteContent = (id: string) =>
  deleteDoc(doc(db, 'content', id));

// ── NARASI & SCENE ───────────────────────────────────────────────
export const subscribeNarasi = (cb: (items: NarasiScene[]) => void): Unsubscribe =>
  onSnapshot(query(collection(db, 'narasi'), orderBy('order')), snap =>
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as NarasiScene))));

export const addNarasi = (data: Omit<NarasiScene, 'id'>) =>
  addDoc(collection(db, 'narasi'), data);

export const updateNarasi = (id: string, data: Partial<NarasiScene>) =>
  updateDoc(doc(db, 'narasi', id), { ...data, updatedAt: Date.now() });

export const deleteNarasi = (id: string) =>
  deleteDoc(doc(db, 'narasi', id));

// ── IDEAS BOARD ──────────────────────────────────────────────────
export const subscribeIdeas = (cb: (items: IdeaItem[]) => void): Unsubscribe =>
  onSnapshot(query(collection(db, 'ideas'), orderBy('createdAt', 'desc')), snap =>
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as IdeaItem))));

export const addIdea = (data: Omit<IdeaItem, 'id'>) =>
  addDoc(collection(db, 'ideas'), data);

export const updateIdea = (id: string, data: Partial<IdeaItem>) =>
  updateDoc(doc(db, 'ideas', id), data);

export const deleteIdea = (id: string) =>
  deleteDoc(doc(db, 'ideas', id));

// ── CAPTION DRAFT ────────────────────────────────────────────────
export const subscribeCaptions = (cb: (items: CaptionDraft[]) => void): Unsubscribe =>
  onSnapshot(query(collection(db, 'captions'), orderBy('createdAt', 'desc')), snap =>
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as CaptionDraft))));

export const addCaption = (data: Omit<CaptionDraft, 'id'>) =>
  addDoc(collection(db, 'captions'), data);

export const updateCaption = (id: string, data: Partial<CaptionDraft>) =>
  updateDoc(doc(db, 'captions', id), { ...data, updatedAt: Date.now() });

export const deleteCaption = (id: string) =>
  deleteDoc(doc(db, 'captions', id));

// ── PROMPT VAULT ─────────────────────────────────────────────────
export const subscribePrompts = (cb: (items: PromptItem[]) => void): Unsubscribe =>
  onSnapshot(query(collection(db, 'prompts'), orderBy('createdAt', 'desc')), snap =>
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as PromptItem))));

export const addPrompt = (data: Omit<PromptItem, 'id'>) =>
  addDoc(collection(db, 'prompts'), data);

export const updatePrompt = (id: string, data: Partial<PromptItem>) =>
  updateDoc(doc(db, 'prompts', id), data);

export const deletePrompt = (id: string) =>
  deleteDoc(doc(db, 'prompts', id));

// ── JURNAL ANALISIS ──────────────────────────────────────────────
export const subscribeJurnal = (cb: (items: JurnalEntry[]) => void): Unsubscribe =>
  onSnapshot(query(collection(db, 'jurnal'), orderBy('date', 'desc')), snap =>
    cb(snap.docs.map(d => ({ id: d.id, ...d.data() } as JurnalEntry))));

export const addJurnal = (data: Omit<JurnalEntry, 'id'>) =>
  addDoc(collection(db, 'jurnal'), data);

export const updateJurnal = (id: string, data: Partial<JurnalEntry>) =>
  updateDoc(doc(db, 'jurnal', id), { ...data, updatedAt: Date.now() });

export const deleteJurnal = (id: string) =>
  deleteDoc(doc(db, 'jurnal', id));
