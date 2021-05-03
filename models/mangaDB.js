const mongoose = require('mongoose');

const mangaSchema = new mongoose.Schema({
  name: String,
  description: String,
  posterImg: String,
  previewImg: String,
  author: String,
  released: String,
  rating: String,
  views: String,
  Status: String,
  link: String
});

const Manga = mongoose.model('manga', mangaSchema);

module.exports = Manga;
