const mongoose = require('mongoose');
const config = require('./core/config');
const logger = require('./core/logger')('seeder');

const prizes = [
  { nama: 'emas 10 gram', maxWinners: 1, currentWinners: 0 },
  { nama: 'smartphone x', maxWinners: 5, currentWinners: 0 },
  { nama: 'smartwatch', maxWinners: 10, currentWinners: 0 },
  { nama: 'vocer 100 ribu', maxWinners: 100, currentWinners: 0 },
  { nama: 'pulsa 50 ribu', maxWinners: 500, currentWinners: 0 },
];

async function seed() {
  await mongoose.connect(`${config.database.connection}/${config.database.name}`);
  logger.info('Connected to MongoDB');

  const { Schema } = mongoose;
  const prizeSchema = new Schema({
    nama: { type: String, required: true },
    maxWinners: { type: Number, required: true },
    currentWinners: { type: Number, default: 0 },
  });

  const Hadiah = mongoose.models.hadiah || mongoose.model('hadiah', prizeSchema);

  await Hadiah.deleteMany({});
  await Hadiah.insertMany(prizes);
  logger.info(`Berhasil menambahkan ${prizes.length} data hadiah.`);

  logger.info('Seeder selesai.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
