module.exports = (mongoose) => {
  const gachaSchema = new mongoose.Schema({
    Id: { 
        type: String, 
        required: true 
    },
    
    hadiahId: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'hadiah', 
        default: null 
    },
    namahadiah: { 
        type: String, 
        default: null 
    },

    memang: { 
        type: Boolean, 
        default: false 
    },

    attemptDate: { 
        type: Date, 
        default: Date.now 
    },
  });

  return mongoose.model('Gacha', gachaSchema);
};