const cron = require('node-cron');
const Post = require('../models/Post');
const { publishToFacebook } = require('../services/facebookService');
const { publishToInstagram } = require('../services/instagramService');
const { publishToTelegram } = require('../services/telegramService');
const { sendWhatsAppIPTV, sendWhatsAppGeneral } = require('../services/whatsappService');

function start() {
  // Ejecutar cada minuto
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const posts = await Post.find({ publicado: false, fechaProgramada: { $lte: now } });
      for (const post of posts) {
        try {
          if (post.tipo === 'iptv') {
            if (post.redes.includes('whatsapp')) await sendWhatsAppIPTV(post);
          } else {
            if (post.redes.includes('facebook')) await publishToFacebook(post);
            if (post.redes.includes('instagram')) await publishToInstagram(post);
            if (post.redes.includes('telegram')) await publishToTelegram(post);
            if (post.redes.includes('whatsapp')) await sendWhatsAppGeneral(post);
          }
          post.publicado = true;
          await post.save();
          console.log(`Post ${post._id} marcado como publicado`);
        } catch (err) {
          console.error(`Error al publicar post ${post._id}:`, err.message || err);
        }
      }
    } catch (err) {
      console.error('Error en scheduler:', err.message || err);
    }
  });
  console.log('Scheduler iniciado (cron cada minuto)');
}

module.exports = { start };
