// pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import API from '../api/axios';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';

export default function Dashboard() {
  const [notes, setNotes]       = useState([]);
  const [search, setSearch]     = useState('');
  const [modalOpen, setModal]   = useState(false);
  const [editing, setEditing]   = useState(null);

  const fetchNotes = async () => {
    const { data } = await API.get('/notes');
    setNotes(data);
  };

  useEffect(() => { fetchNotes(); }, []);

  const filtered = notes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.tags.some(t => t.includes(search))
  );

  const handleSave = async (noteData) => {
    if (editing) {
      await API.put(`/notes/${editing._id}`, noteData);
    } else {
      await API.post('/notes', noteData);
    }
    fetchNotes();
    setModal(false);
    setEditing(null);
  };

  const handleDelete = async (id) => {
    await API.delete(`/notes/${id}`);
    fetchNotes();
  };

  const handlePin = async (note) => {
    await API.put(`/notes/${note._id}`, { pinned: !note.pinned });
    fetchNotes();
  };

  return (
    <div>
      <input value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search notes or tags..." />
      <button onClick={() => setModal(true)}>+ New Note</button>

      <div className="notes-grid">
        {filtered.map(note => (
          <NoteCard key={note._id} note={note}
            onEdit={() => { setEditing(note); setModal(true); }}
            onDelete={() => handleDelete(note._id)}
            onPin={() => handlePin(note)}
          />
        ))}
      </div>

      {modalOpen && (
        <NoteModal
          note={editing}
          onSave={handleSave}
          onClose={() => { setModal(false); setEditing(null); }}
        />
      )}
    </div>
  );
}