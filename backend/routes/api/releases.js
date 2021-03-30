const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { Release, Artist } = require('../../db/models')
const { check } = require('express-validator');
const { requireAuth, checkIfCurrentUser } = require('../../utils/auth.js');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3.js');

const validateNewRelease = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name'),
    check('coverURL')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a cover photo'),
    check('releaseDate')
        .exists({ checkFalsy: true })
        .isDate()
        .withMessage('Please provide a valid release date'),
    
]

router.post('/new-release', 
singleMulterUpload("image"),
requireAuth,
validateNewRelease, 
asyncHandler(async (req, res, next) => {
    const { artistId, name, releaseDate, bio, credits } = req.body;
    // const artist = await Artist.findByPk(artistId);
    
    // if(checkIfCurrentUser(artist.userId, req)){
        coverURL = await singlePublicFileUpload(req.file);
        
        const release = await Release.create({
            artistId, coverURL, name, releaseDate, bio, credits
        })

        return res.json({
            release
        })
    // }else{
    //     throw new Error('Unauthorized') 
    // }
    
}))

module.exports = router;