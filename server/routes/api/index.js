const router = require('express').Router();
const cardRoutes = require('./cardRoutes.js');

router.use('/cards', cardRoutes);

module.exports = router;