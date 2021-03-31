const router = require('express').Router();


const sessionRouter = require('./session');
const usersRouter = require('./users');
const artistRouter = require('./artists');
const releaseRouter = require('./releases');
const songRouter = require('./song');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use(songRouter);
router.use(releaseRouter);
router.use(artistRouter)

module.exports = router;


