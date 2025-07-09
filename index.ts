
// index.ts - Server utama Elysia.js
import { Elysia } from 'elysia';
import { db, getKandidat, getPemilih, tambahSuara, tandaiPemilih, resetVoting, tambahKandidat } from './db';

const app = new Elysia();

app
  .get('/kandidat', () => getKandidat())

  .get('/hasil', () => getKandidat())

  .post('/vote', async ({ body }) => {
    const { nis, pilihan } = body as { nis: string; pilihan: number };

    const pemilih = getPemilih(nis);
    if (!pemilih) return { error: 'NIS tidak ditemukan' };
    if (pemilih.sudah_memilih) return { error: 'Kamu sudah memilih' };

    const sukses = tambahSuara(pilihan);
    if (!sukses) return { error: 'Kandidat tidak ditemukan' };

    tandaiPemilih(nis);
    return { success: true, pesan: 'Vote berhasil dikirim' };
  })

  .post('/admin/reset', () => {
    resetVoting();
    return { success: true, pesan: 'Data voting telah direset' };
  })

  .post('/admin/tambah', async ({ body }) => {
    const { nama } = body as { nama: string };
    tambahKandidat(nama);
    return { success: true };
  })

  .get('/admin/pemilih', () => db.prepare('SELECT * FROM pemilih').all())

  .listen(3000);

console.log('✅ Server voting jalan di http://localhost:3000');
