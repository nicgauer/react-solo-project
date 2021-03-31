const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { Release, Artist, Song } = require('../../db/models')
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
    const { artistId, name, releaseURL, releaseDate, bio, credits } = req.body;
    // const artist = await Artist.findByPk(artistId);
    
    // if(checkIfCurrentUser(artist.userId, req)){
        coverURL = await singlePublicFileUpload(req.file);
        
        const release = await Release.create({
            artistId, coverURL, name, releaseURL, releaseDate, bio, credits
        })

        return res.json({
            release
        })
    // }else{
    //     throw new Error('Unauthorized') 
    // }
    
}))

router.get('/releases/:artistUrl/:releaseUrl', asyncHandler( async (req, res) => {
    const artistUrl = req.params.artistUrl;
    const releaseUrl = req.params.releaseUrl
    console.log('Artist URL', artistUrl);
    console.log('Release ', releaseUrl);

    const artist = await Artist.findOne({ 
        attributes: ['customURL', 'name', 'location', 'pictureURL'],
        where: { 
            customURL: artistUrl
        },
        include: [{ 
            model: Release, 
            where: {
                releaseURL: releaseUrl,
            },
            include: [{
                model: Song
            }]
        }]
    })
        return res.json({
            artist
        })     
    
}))

router.get('/releases/:id', asyncHandler( async (req, res) => {
    const id = req.params.id

    const release = await Release.findByPk(id, {
        attributes: ['releaseURL'],
        include: [{
            model: Artist,
            attributes: ['customURL']
        }]
    })

    return res.json({
        release
    })
}))

module.exports = router;