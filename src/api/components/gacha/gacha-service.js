const gachaRepository = require('./gacha-repository');

const batas_harian = 5;

function sensor(nama) {
  if (!nama) return nama;

  const huruf = nama.split(' ');
  const kata = huruf.map((huruf) => 
    {
    if (huruf.length <= 1) return huruf;
    if (huruf.length === 2) return huruf[0] + '*';

    const awal = huruf[0];
    const ahkir = huruf[huruf.length - 1];
    const tengah = '*'.repeat(huruf.length - 2);
    return awal + tengah + ahkir;
  });

  return kata.join(' ');
}

async function spin(Id) {
  const upaya = await gachaRepository.jumlahpercobaan(Id);

  if (upaya >= batas_harian) {
    return {
      berhasil: false,
      pesan: 'Kamu sudah mencapai batas gacha harian.',
      upaya: upaya,
    };
  }

}

module.exports = {
  spin,
};