const { Gacha, hadiah: Prize } = require('../../../models');

async function jumlahpercobaan(Id) {
  const mulai = new Date();
  mulai.setHours(0, 0, 0, 0);

  const ahkir = new Date();
  ahkir.setHours(23, 59, 59, 999);

  return Gacha.countDocuments({
    Id,
    attemptDate: { $gte: mulai, $lte: ahkir },
  });
}

async function getAvailablePrizes() {
  const allhadiah = await Prize.find({});
  const result = [];

  for (let i = 0; i < allhadiah.length; i++) {
    const hadiah = allhadiah[i];
    const totalpemenang = await Gacha.countDocuments({ hadiahId: hadiah._id, menang: true });

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
    menang: menang,
    attemptDate: new Date(),
  });
}

async function getriwayat(Id) {
  return Gacha.find({ Id }).sort({ attemptDate: -1 });
}

async function getAllhadiah() {
  return Prize.find({});
}

async function getWinnersByPrize(hadiahId) {
  return Gacha.find({ hadiahId, menang: true }).select('Id namahadiah attemptDate');
}

module.exports = {
  jumlahpercobaan,
  getAvailablePrizes,
  riwayat,
  getriwayat,
  getAllhadiah,
  getWinnersByPrize,
};