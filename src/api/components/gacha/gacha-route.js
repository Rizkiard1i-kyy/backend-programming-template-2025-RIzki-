const express = require('express');

const gachaController = require('./gacha-controller');

const route = express.Router();

module.exports = (app) => {
  app.use('/gacha', route);

  route.post('/spin', gachaController.spin);

  route.get('/riwayat/:Id', gachaController.getriwayat);
 
  route.get('/pemenang', gachaController.getPemenang);
  
  route.get('/hadiah', gachaController.getHadiah);

};
