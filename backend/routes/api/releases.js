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

router.get('/releases/:artistUrl/:releaseName', asyncHandler( async (req, res) => {
    const artistUrl = req.params.artistUrl;
    const releaseName = req.params.releaseName
    console.log('Artist URL', artistUrl);
    console.log('Release ', releaseName);

    // const artist = await Artist.findOne({ 
    //     where: { 
    //         customURL: artistUrl
    //     },
    //     include: Release
    // })

    const release = await Release.findOne({
        where: {
            name: releaseName,
        },
        include: Artist
    })

    // if(!artist) {
    //     const err = new Error('Artist not found!');
    //     err.status = 404;
    //     err.title = 'Artist not found!';
    //     err.errors = ['Artist not found!'];
    //     return next(err);
    // }

    
        // const release = artist.Releases.filter(target => target.name === releaseName);
        return res.json({
            release
        })     
    
}))

module.exports = router;