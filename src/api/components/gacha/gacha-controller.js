const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');


async function spin(request, response, next) {
  try {
    const {Id} = request.body;

    if (!Id) {
      throw errorResponder(errorTypes.VALIDATION, 'nama harus di isi');
    }

    const result = await gachaService.roll(Id);

    if (!result.success && result.error === 'batas harian udh abis') {
      throw errorResponder(errorTypes.FORBIDDEN, result.message);
    }
    return response.status(200).json(result);
  } catch (error) {
    return next(error);
  }
}


async function getriwayat(request, response, next) {
  try {
    const { Id } = request.params;

    if (!Id) {
      throw errorResponder(errorTypes.VALIDATION, 'id wajib di isi');
    }

    const riwayat = await gachaService.getriwayat(Id);
    return response.status(200).json({ Id, riwayat });
  } catch (error) {
    return next(error);
  }
}

async function getPemenang(request, response, next) {
  try {
    const pemenang = await gachaService.getPemenang();
    return response.status(200).json({ pemenang });
  } catch (error) {
    return next(error);
  }
}

async function getHadiah(request, response, next) {
  try {
    const hadiah = await gachaService.getHadiah();
    return response.status(200).json({ hadiah });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  spin,
  getriwayat,
  getPemenang,
  getHadiah
};
