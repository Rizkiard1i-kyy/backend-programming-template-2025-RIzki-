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

  const hadiahtersisa = await gachaRepository.getAvailablePrizes();
  let terpilih = null;

  if (hadiahtersisa.length > 0) {
    const rand = Math.floor(Math.random() * hadiahtersisa.length);
    terpilih = hadiahtersisa[rand];
  }

  const menang = terpilih !== null;

  await gachaRepository.recordAttempt({
    Id,
    hadiahId: menang ? terpilih._Id : null,
    namahadiah: menang ? terpilih.name : null,
    menang: menang,
  });

  const attemptsToday = todayAttempts + 1;
  const remainingAttempts = batas_harian - attemptsToday;

  if (menang) {
    return {
      berhasil: true,
      menang: true,
      hadiah: selectedPrize.name,
      pesan: 'Kamu menang: ' + selectedPrize.name,
      attemptsToday,
      remainingAttempts,
    };
  }

  return {
    berhasil: true,
    memang: false,
    hadiah: null,
    pesan: 'Sayang sekali, kamu tidak memenangkan hadiah apapun.',
    attemptsToday,
    remainingAttempts,
  };
}

async function getriwayat(Id) {
  const history = await gachaRepository.getUserHistory(Id);

  const result = [];
  for (let i = 0; i < history.length; i++) {
    result.push({
      attemptDate: history[i].attemptDate,
      menang: history[i].won,
      hadiah: history[i].namahadiah || null,
    });
  }

  return result;
}

async function getHadiah() {
  const hadiah = await gachaRepository.getAllPrizes();

  const result = [];
  for (let i = 0; i < hadiah.length; i++) {
    result.push({
      Id: hadiah[i]._Id,
      nama: hadiah[i].name,
      maxWinners: hadiah[i].maxWinners,
    });
  }

  return result;
}

async function getPemenang() {
  const hadiah = await gachaRepository.getAllPrizes();
  const result = [];

  for (let i = 0; i < hadiah.length; i++) {
    const hadiah = hadiah[i];
    const winners = await gachaRepository.getWinnersByPrize(hadiah._Id);

    const sembunyikanpemenang = [];
    for (let j = 0; j < winners.length; j++) {
      sembunyikanpemenang.push({
        Id: sensor(winners[j].Id),
        menang: winners[j].attemptDate,
      });
    }

    result.push({
      hadiah: hadiah.name,
      maxWinners: hadiah.maxWinners,
      pemenang: maskedWinners,
    });
  }

  return result;
}

module.exports = {
  spin,
  getriwayat,
  getHadiah,
  getPemenang,
};