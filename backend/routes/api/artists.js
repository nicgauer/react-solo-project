const express = require('express');
const router = express.Router();

const asyncHandler = require('express-async-handler');
const { requireAuth, checkIfCurrentUser } = require('../../utils/auth');
const { Artist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3.js');

const validateNewArtist = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an artist name'),
    check('customURL')
        .exists({ checkFalsy: true })
        .withMessage('Please choose a customURL')    
]


//Returns all artists
router.get('/artists', asyncHandler( async (req, res) => {
    const artists = await Artist.findAll()

    return res.json({
        artists
    });
}))

//Returns all artists owned by passed in user
router.get('/artists/:userId', asyncHandler( async (req, res) => {
    const userId = req.params.userId;
    const artists = await Artist.findAll({ 
        where: { 
            userId
        }
    })
    return res.json({
        artists,
    })
}))


router.post('/new-artist', singleMulterUpload("image"), requireAuth, validateNewArtist, asyncHandler(async (req, res) => {
    const { name, customURL, bio, location, userId } = req.body;

    // console.log(req);

    // if(checkIfCurrentUser(userId, req)){
        // if(req.file){
           const pictureURL = await singlePublicFileUpload(req.file);
        // }
        
        const artist = await Artist.create({ 
            name, 
            customURL, 
            pictureURL,
            bio,
            location,
            userId,
        })
        
        if(!artist){
            const err = new Error('Artist creation failed!');
            err.status = 404;
            err.title = 'Artist creation failed!';
            err.errors = ['Artist creation failed!'];
            return next(err);
        }
        
        return res.json({
            artist,
        })
    // }else{
    //     const err = new Error('Unauthorized');
    //     return next(err);
    // }
}))



//Get artist info
router.get('/:artistUrl', asyncHandler( async (req, res, next) => {
    const artistUrl = req.params.artistUrl;

    const artist = await Artist.findOne({
        where: { 
            customURL: artistUrl,
        }
    })

    if(!artist) {
        const err = new Error('Artist not found!');
        err.status = 404;
        err.title = 'Artist not found!';
        err.errors = ['Artist not found!'];
        return next(err);
    }

    return res.json({ 
        artist
    })

}))

router.put('/:artistUrl/edit', validateNewArtist, asyncHandler( async (req, res) => {
    const artistUrl = req.params.artistId;

    const artist = await Artist.findOne({
        where: { 
            customURL: artistUrl,
        }
    })

    if(req.user.userId === artist.userId){
        //TO DO -- finish
    }
}))


module.exports = router;