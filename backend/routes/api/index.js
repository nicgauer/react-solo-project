const router = require('express').Router();


const sessionRouter = require('./session');
const usersRouter = require('./users');
const artistRouter = require('./artists');
const releaseRouter = require('./releases');
const songRouter = require('./song');
const followRouter = require('./follows');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/follows', followRouter);
router.use('/releases', releaseRouter);
router.use(songRouter);
router.use(artistRouter)

module.exports = router;


