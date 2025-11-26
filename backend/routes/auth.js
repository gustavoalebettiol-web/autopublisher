const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

router.post('/register', [
  check('email').isEmail().withMessage('Email inválido'),
  check('password').isLength({ min: 6 }).withMessage('Password debe tener al menos 6 caracteres')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    let { email, password, nombre } = req.body;
    email = String(email).toLowerCase().trim();
    const existing = await User.findOne({ email });
    console.log('Mongoose readyState (register):', mongoose.connection.readyState);
    if (existing) return res.status(409).json({ error: 'Usuario ya existe' });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed, nombre });
    await user.save();
    // generar token al registrar para experiencia de login inmediato
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: user._id, email: user.email, nombre: user.nombre } });
  } catch (err) {
    // Manejar error duplicado en caso de condición de carrera
    if (err && err.code === 11000) return res.status(409).json({ error: 'Usuario ya existe' });
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Mongoose readyState (login):', mongoose.connection.readyState);
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
