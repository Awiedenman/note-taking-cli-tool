import { readFile, writeFile } from 'node:fs';
import fs from 'node:fs/promises';


const DB_PATH = new URL( '../db.json', import.meta.url).path;

export const getDB = async() => {
  const db = await fs.readFile(DB_PATH, 'utf-8')
  return JSON.parse(db)
};

const saveDB = async(db) => {
  await fs.writeFile(DB_PATH,JSON.stringify(db, null, 2));
  return db;
};

const insertDB = async(note) => {
  const db = await db;
  db.notes.push(note);
  await saveDB(db);
  return note;
}

