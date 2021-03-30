const router = require('express').Router();


const sessionRouter = require('./session');
const usersRouter = require('./users');
const artistRouter = require('./artists');
const releaseRouter = require('./releases');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use(releaseRouter);
router.use(artistRouter)

module.exports = router;


