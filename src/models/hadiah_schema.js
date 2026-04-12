module.exports = (mongoose) => {
  const hadiahSchema = new mongoose.Schema({
    nama: { 
        type: String, 
        required: true 
    },

    maxWinners: { 
        type: Number, 
        required: true 
    },
  });

  return mongoose.model('hadiah', hadiahSchema);
};