const express = require('express');
const { askDeepSeek, generateSocialContent, translateText } = require('../services/deepseekService');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * POST /api/deepseek/chat
 * Envía un mensaje a DeepSeek y obtiene una respuesta
 */
router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { message, model, temperature, max_tokens } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'El campo "message" es obligatorio' });
    }

    const response = await askDeepSeek(message, {
      model,
      temperature,
      max_tokens,
    });

    res.json({
      success: true,
      message,
      response,
    });
  } catch (error) {
    console.error('Error en /deepseek/chat:', error);
    res.status(500).json({
      error: error.message || 'Error al comunicarse con DeepSeek',
    });
  }
});

/**
 * POST /api/deepseek/generate-content
 * Genera contenido para redes sociales
 */
router.post('/generate-content', authMiddleware, async (req, res) => {
  try {
    const { topic, platform } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'El campo "topic" es obligatorio' });
    }

    const content = await generateSocialContent(topic, platform || 'twitter');

    res.json({
      success: true,
      topic,
      platform: platform || 'twitter',
      generatedContent: content,
    });
  } catch (error) {
    console.error('Error en /deepseek/generate-content:', error);
    res.status(500).json({
      error: error.message || 'Error al generar contenido',
    });
  }
});

/**
 * POST /api/deepseek/translate
 * Traduce un texto
 */
router.post('/translate', authMiddleware, async (req, res) => {
  try {
    const { text, targetLanguage } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'El campo "text" es obligatorio' });
    }

    const translated = await translateText(text, targetLanguage || 'inglés');

    res.json({
      success: true,
      originalText: text,
      targetLanguage: targetLanguage || 'inglés',
      translatedText: translated,
    });
  } catch (error) {
    console.error('Error en /deepseek/translate:', error);
    res.status(500).json({
      error: error.message || 'Error al traducir',
    });
  }
});

module.exports = router;
