const gachaService = require('./gacha-service');
const { errorResponder, errorTypes } = require('../../../core/errors');


async function gacha(request, response, next) {
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


module.exports = {
  gacha
};
