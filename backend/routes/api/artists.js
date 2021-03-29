const express = require('express');
const router = express.Router();

const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Artist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateNewArtist = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an artist name'),
    check('customURL')
        .exists({ checkFalsy: true })
        .withMessage('Please choose a customURL')    
]


router.post('/new-artist', singleMulterUpload("image"), validateNewArtist, asyncHandler(async (req, res) => {
    const { name, customURL, bio, location, userId } = req.body;
    
    const pictureURL = await singlePublicFileUpload(req.file);

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
}))



//Get artist info
router.get('/:artistUrl', asyncHandler( async (req, res, next) => {
    const artistUrl = req.params.artistId;

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