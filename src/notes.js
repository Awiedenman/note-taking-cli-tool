import { getDB, saveDB, insertDB } from './db';

export const newNote =  async(note, tags) => {
  const newNote = {
    tags,
    content: note,
    id: Date.now()
  }
  await insertDB(newNote);
  return newNote;
};

export const getAllNotes = async() => {
  const { notes } = await getDB();
  return notes;
}

export const findNotes = async(filter) => {
  const notes = await getAllNotes();
  return notes.filter((note) => note === note.content.toLowercase().includes(filter.toLowercase()))
}

export const removeNote = async id => {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
   const newNotes =  notes.filter(note => note.id !== id)
   saveDB({notes: newNotes});
   return id;
  };
};

export const removeAllNotes = () => saveDB({notes: []})
