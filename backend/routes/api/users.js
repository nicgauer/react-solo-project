const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3.js');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6})
        .withMessage('Password must be at least 6 characters long'),
    handleValidationErrors,
]


//Sign up route
router.post('', singleMulterUpload("image"), validateSignup, asyncHandler(async (req, res) => {
    const { email, password, username } = req.body;
    
    //AWS upload
    const pictureURL = await singlePublicFileUpload(req.file);

    const user = await User.signup({ email, username, password, pictureURL });
    
    await setTokenCookie(res, user);

    return res.json({ 
        user,
    })
}))


module.exports = router;