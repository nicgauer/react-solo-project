const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth.js');


const sessionRouter = require('./session');
const usersRouter = require('./users');
const artistRouter = require('./artists');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use(artistRouter)

module.exports = router;


