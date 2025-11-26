const express = require('express');
const router = express.Router();

router.post('/webhook', (req, res) => {
  console.log('Webhook recibido:', req.body);
  res.sendStatus(200);
});

module.exports = router;
