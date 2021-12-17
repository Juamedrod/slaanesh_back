const router = require('express').Router();
const cardRouter = require('./api/card');

router.use('/card', cardRouter);



module.exports = router;