module.exports = (mongoose) => {
  const prizeSchema = new mongoose.Schema({
    nama: { 
        type: String, 
        required: true 
    },
    maxWinners: { 
        type: Number, 
        required: true 
    },
    currentWinners: {
        type: Number,
        default: 0
    },
  });

  return mongoose.model('hadiah', prizeSchema);
};
