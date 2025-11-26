exports.sendWhatsAppIPTV = async (post) => {
  console.log(`[WhatsApp IPTV] Enviado: ${post.texto || post.text}`);
};

exports.sendWhatsAppGeneral = async (post) => {
  console.log(`[WhatsApp General] Enviado: ${post.texto || post.text}`);
};
