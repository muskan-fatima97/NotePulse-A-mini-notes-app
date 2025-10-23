// App.jsx
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState(null);
  const [form, setForm] = useState({ title: "", description: "" });

  // Load notes from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);
  // Save updated notes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    if (editingNote) {
      setNotes(notes.map((n) => (n.id === editingNote ? { ...n, ...form } : n)));
      setEditingNote(null);
    } else {
      setNotes([...notes, { id: Date.now(), ...form }]);
    }
    setForm({ title: "", description: "" });
  };
  const handleEdit = (id) => {
    const note = notes.find((n) => n.id === id);
    setForm({ title: note.title, description: note.description });
    setEditingNote(id);
  };
  const handleDelete = (id) => setNotes(notes.filter((n) => n.id !== id));
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.description.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-transparent"></div>

      <div className="relative z-10 p-6 text-gray-900">
        <h1 className="text-5xl font-bold text-center text-white mb-10">
          NotePulse
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-start w-full">
          {/* Left side - Add/Edit form */}
          <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg w-full md:w-3/4 lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              {editingNote ? "Edit Note" : "Add a New Note"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 border rounded-xl "
              />
              <textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full p-2 border rounded-xl h-28 "
              ></textarea>

              <button
                type="submit"
                className="font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-yellow-600 hover:via-orange-600 hover:to-red-600 text-white px-4 py-2 transition w-full rounded-xl"
              >
                {editingNote ? "Update Note" : "Add Note"}
              </button>
            </form>
          </div>
          {/* Notes Record */}
          <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl shadow-lg w-full md:w-3/4 lg:w-1/2">
            <h2 className="text-3xl font-bold text-white mb-4 text-center">
              Your Notes
            </h2>
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 mb-4 border rounded-xl "
            />
            <div className="grid gap-4 max-h-[400px] overflow-y-auto pr-2 bg-transparent">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  // <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                  <div
                    key={note.id}
                    className="bg-white rounded-lg p-4 border "
                  >
                    <h3 className="font-semibold text-lg mb-1">{note.title}</h3>
                    <p className="text-gray-700 mb-3">{note.description}</p>
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(note.id)}
                        className="px-3 py-1 text-sm bg-indigo-700 text-white rounded hover:bg-indigo-900">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                        Delete
                      </button>
                    </div>
                  </div>
                  // </div>
                ))
              ) : (
                <p className="text-center text-gray-200">No notes found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;