const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, [
  check('texto').notEmpty().withMessage('texto es requerido'),
  check('fechaProgramada').optional().isISO8601().withMessage('fechaProgramada inválida')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const data = { ...req.body, clienteId: req.userId };
    const post = new Post(data);
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find({ clienteId: req.userId }).sort({ fechaProgramada: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
