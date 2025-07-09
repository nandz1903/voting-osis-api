
// seed.ts - Isi data awal kandidat dan pemilih
import { db } from './db';

// Tambah kandidat
const kandidat = ["Dimas Pratama", "Laras Salsabila", "Putra Mahesa"];
kandidat.forEach(nama => {
  db.prepare('INSERT INTO kandidat (nama) VALUES (?)').run(nama);
});

// Tambah pemilih
const pemilih = ["123", "456", "789", "321"];
pemilih.forEach(nis => {
  db.prepare('INSERT OR IGNORE INTO pemilih (nis) VALUES (?)').run(nis);
});

console.log("✅ Data awal kandidat dan pemilih berhasil dimasukkan.");
