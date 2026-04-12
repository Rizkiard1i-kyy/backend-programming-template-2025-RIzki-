const { Gacha, Prize } = require('../../../models');

async function jumlahpercobaan(userId) {
  const mulai = new Date();
  mulai.setHours(0, 0, 0, 0);

  const ahkir = new Date();
  ahkir.setHours(23, 59, 59, 999);

  return Gacha.countDocuments({
    Id,
    attemptDate: { $gte: mulai, $lte: ahkir },
  });
}

async function getjumlah_hadiah() {
  const allhadiah = await Prize.find({});
  const result = [];

  for (let i = 0; i < allPrizes.length; i++) {
    const hadiah = allhadiah[i];
    const totalpemenang = await Gacha.countDocuments({ prizeId: haidah._id, won: true });

    if (totalpemenang < hadiah.maxWinners) {
      result.push(hadiah);
    }
  }

  return result;
}

async function riwayat({ Id, hadiahId, namahadiah, menang }) {
  return Gacha.create({
    Id,
    hadiahId: hadiahId || null,
    namahadiah: namahadiah || null,
    menang,
    tanggal: new Date(),
  });
}

async function getriwayat(Id) {
  return Gacha.find({ Id }).sort({ tanggal: -1 });
}

async function getAllhadiah() {
  return Prize.find({});
}

async function getWinnersByPrize(hadiahId) {
  return Gacha.find({ hadiahId, menang: true }).select('ID namahadiah tanggal');
}

module.exports = {
  jumlahpercobaan,
  getjumlah_hadiah,
  riwayat,
  getriwayat,
  getAllhadiah,
  getWinnersByPrize,
};