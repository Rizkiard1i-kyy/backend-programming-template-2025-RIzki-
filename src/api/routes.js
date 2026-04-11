const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const gacha = require('./components/gacha/gacha-route');

module.exports = () => {
  const app = express.Router();

  gacha(app);
  books(app);
  users(app);

  return app;
};
