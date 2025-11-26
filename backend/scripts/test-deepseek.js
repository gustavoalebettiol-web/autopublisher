#!/usr/bin/env node

/**
 * Script de prueba para DeepSeek
 * Uso: node test-deepseek.js
 * Requiere: DEEPSEEK_API_KEY en variables de entorno
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const { askDeepSeek, generateSocialContent, translateText } = require('../services/deepseekService');

async function runTests() {
  console.log('🚀 Iniciando pruebas de DeepSeek...\n');

  try {
    // Prueba 1: Chat simple
    console.log('📝 Prueba 1: Chat simple');
    console.log('Pregunta: ¿Qué es una red neural?');
    const chatResponse = await askDeepSeek('¿Qué es una red neural?', { max_tokens: 200 });
    console.log('Respuesta:', chatResponse);
    console.log('✅ Prueba 1 exitosa\n');

    // Prueba 2: Generar contenido para Twitter
    console.log('🐦 Prueba 2: Generar tweet');
    const tweet = await generateSocialContent('Inteligencia Artificial', 'twitter');
    console.log('Tweet generado:', tweet);
    console.log('✅ Prueba 2 exitosa\n');

    // Prueba 3: Generar contenido para Instagram
    console.log('📸 Prueba 3: Generar caption de Instagram');
    const instagramCaption = await generateSocialContent('Tecnología y programación', 'instagram');
    console.log('Caption:', instagramCaption.substring(0, 150) + '...');
    console.log('✅ Prueba 3 exitosa\n');

    // Prueba 4: Traducir texto
    console.log('🌍 Prueba 4: Traducir texto');
    const originalText = 'Hello, how are you today?';
    console.log('Texto original:', originalText);
    const translated = await translateText(originalText, 'español');
    console.log('Traducción:', translated);
    console.log('✅ Prueba 4 exitosa\n');

    console.log('✨ ¡Todas las pruebas completadas exitosamente!');
  } catch (error) {
    console.error('❌ Error durante las pruebas:', error.message);
    process.exit(1);
  }
}

runTests();
