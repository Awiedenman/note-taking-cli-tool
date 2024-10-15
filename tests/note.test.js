import '../src/notes';
import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({ // returns a spy, a fn() that will tell you everything that happens to it.
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import('../src/db.js');
const { newNote, getAllNotes, removeNote } = await import('../src/notes.js');

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
})

test('newNote: takes in a string and inserts it into db.json storage.', async() => {
  const note = 'Test note';
  const tags = ['tag1', 'tag2'];
  const mockNote = {
    tags,
    content: note,
    id: 1,
  };
  insertDB.mockResolvedValue(mockNote);

  const result = await newNote(mockNote.content, mockNote.tags);
  expect(result.content).toEqual(mockNote.content);
  expect(result.tags).toEqual(mockNote.tags);
})

test('getAllNotes returns all notes', async () => {
  // ... existing code ...

  const result = await getAllNotes();
  expect(result).toEqual(expect.arrayContaining([
    expect.objectContaining({
      content: expect.any(String),
      id: expect.any(Number),
      tags: expect.arrayContaining([expect.any(String)])
    })
  ]));
  expect(result.length).toBeGreaterThan(0);
});

test('removeNote does nothing if id is not found', async () => {
  const notes = [
    { id: 1, content: 'note 1' },
    { id: 2, content: 'note 2' },
    { id: 3, content: 'note 3' },
  ];
  saveDB.mockResolvedValue(notes);

  const idToRemove = 4;
  const result = await removeNote(idToRemove);
  expect(result).toBeUndefined();
});
