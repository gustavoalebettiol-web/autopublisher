const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tipo: { type: String, enum: ['general', 'iptv', 'streaming'], default: 'general' },
  redes: [{ type: String }],
  texto: { type: String },
  imagenUrl: { type: String },
  videoUrl: { type: String },
  enlace: { type: String },
  fechaProgramada: { type: Date },
  publicado: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
