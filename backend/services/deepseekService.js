const axios = require('axios');

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

/**
 * Envía un mensaje a la API de DeepSeek y obtiene una respuesta
 * @param {string} message - El mensaje a enviar
 * @param {object} options - Opciones adicionales (model, temperature, etc.)
 * @returns {Promise<string>} - La respuesta de DeepSeek
 */
async function askDeepSeek(message, options = {}) {
  if (!DEEPSEEK_API_KEY) {
    throw new Error('DEEPSEEK_API_KEY no está definida en las variables de entorno');
  }

  try {
    const payload = {
      model: options.model || 'deepseek-chat',
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: options.temperature || 0.7,
      max_tokens: options.max_tokens || 1000,
    };

    const response = await axios.post(DEEPSEEK_API_URL, payload, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 30000, // 30 segundos
    });

    if (response.data.choices && response.data.choices[0]) {
      return response.data.choices[0].message.content;
    }

    throw new Error('Respuesta inesperada de DeepSeek');
  } catch (error) {
    if (error.response) {
      throw new Error(`Error de DeepSeek (${error.response.status}): ${error.response.data?.error?.message || error.message}`);
    }
    throw error;
  }
}

/**
 * Genera contenido para redes sociales usando DeepSeek
 * @param {string} topic - Tema del contenido
 * @param {string} platform - Red social (twitter, instagram, facebook)
 * @returns {Promise<string>} - Contenido generado
 */
async function generateSocialContent(topic, platform = 'twitter') {
  const platformInstructions = {
    twitter: 'Crea un tweet de máximo 280 caracteres',
    instagram: 'Crea un caption para Instagram de máximo 2200 caracteres con hashtags relevantes',
    facebook: 'Crea un post para Facebook de máximo 4000 caracteres',
  };

  const instruction = platformInstructions[platform] || platformInstructions.twitter;
  const prompt = `${instruction}. Tema: ${topic}. Solo devuelve el contenido, sin explicaciones adicionales.`;

  return await askDeepSeek(prompt, { temperature: 0.8 });
}

/**
 * Traduce un texto usando DeepSeek
 * @param {string} text - Texto a traducir
 * @param {string} targetLanguage - Idioma objetivo (p. ej. 'español', 'inglés')
 * @returns {Promise<string>} - Texto traducido
 */
async function translateText(text, targetLanguage = 'inglés') {
  const prompt = `Traduce el siguiente texto al ${targetLanguage}. Solo devuelve la traducción, sin explicaciones:\n\n${text}`;
  return await askDeepSeek(prompt, { temperature: 0.3 });
}

module.exports = {
  askDeepSeek,
  generateSocialContent,
  translateText,
};
