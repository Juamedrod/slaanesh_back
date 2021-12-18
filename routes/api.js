const router = require('express').Router();
const cardRouter = require('./api/card');
const matchRouter = require('./api/match');
const usersRouter = require('./api/users');
const mazeRouter = require('./api/maze');

router.use('/users', usersRouter);
router.use('/card', cardRouter);
router.use('/match', matchRouter);
router.use('/maze', mazeRouter);



module.exports = router;