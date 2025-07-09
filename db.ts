
// db.ts - Modul SQLite
import Database from 'better-sqlite3';

export const db = new Database('database.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS kandidat (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    suara INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS pemilih (
    nis TEXT PRIMARY KEY,
    sudah_memilih INTEGER DEFAULT 0
  );
`);

export const getKandidat = () =>
  db.prepare('SELECT * FROM kandidat').all();

export const getPemilih = (nis: string) =>
  db.prepare('SELECT * FROM pemilih WHERE nis = ?').get(nis);

export const tambahSuara = (id: number) => {
  const kandidat = db.prepare('SELECT * FROM kandidat WHERE id = ?').get(id);
  if (!kandidat) return false;
  db.prepare('UPDATE kandidat SET suara = suara + 1 WHERE id = ?').run(id);
  return true;
};

export const tandaiPemilih = (nis: string) => {
  db.prepare('UPDATE pemilih SET sudah_memilih = 1 WHERE nis = ?').run(nis);
};

export const resetVoting = () => {
  db.prepare('UPDATE kandidat SET suara = 0').run();
  db.prepare('UPDATE pemilih SET sudah_memilih = 0').run();
};

export const tambahKandidat = (nama: string) => {
  db.prepare('INSERT INTO kandidat (nama) VALUES (?)').run(nama);
};
