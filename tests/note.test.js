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
