const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { Release, Song } = require('../../db/models');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth.js');
const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3.js');

const validateNewSong = [
    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name'),
]

router.post('/new-song', requireAuth, validateNewSong, singleMulterUpload("audio"), asyncHandler( async (req, res) => {
    const { releaseId, name, trackNumber, enableDownload, about, credits } = req.body;

    console.log('track number', trackNumber);
    console.log('release id', releaseId);
    const songURL = await singlePublicFileUpload(req.file);

    if(songURL){
        const song = await Song.create({
            releaseId, name, trackNumber, songURL, enableDownload, about, credits
        })
        
        return res.json({
            song
        })
    }
}))

module.exports = router