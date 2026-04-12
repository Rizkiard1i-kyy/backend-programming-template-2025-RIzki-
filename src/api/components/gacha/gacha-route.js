const express = require('express');

const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/spin', gachaController.roll);

  route.get('/riwayat/:Id', gachaController.getUserHistory);
 
  route.get('/pemenang', gachaController.getPrizeWinners);
  
  route.get('/hadiah', gachaController.getPrizes);

};
