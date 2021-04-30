const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  name: String,
  description: String,
  posterImg: String,
  previewImg: String,
  author: String,
  link: String
})

const Manga = mongoose.model('Manga', mangaSchema);

module.exports = Manga;
