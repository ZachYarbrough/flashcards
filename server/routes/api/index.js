const router = require('express').Router();
const cardRoutes = require('./cardRoutes.js');
const userRoutes = require('./userRoutes.js');

router.use('/users', userRoutes);
router.use('/cards', cardRoutes);

module.exports = router;