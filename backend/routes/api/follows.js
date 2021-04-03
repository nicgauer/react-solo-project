const router = require('express').Router();

const asyncHandler = require('express-async-handler');
const { Follow, Artist, User } = require('../../db/models');
const { check } = require('express-validator');
const { requireAuth } = require('../../utils/auth.js');

router.get('/u/:userId', asyncHandler( async (req, res) => {
    const userId = req.params.userId;
    const follows = await Follow.findAll({
        where: {
            userId
        },
        include: Artist
    })

    return res.json({
        follows
    })
}))

router.get('/a/:artistId', asyncHandler( async (req, res) => {
    const artistId = req.params.artistId;
    const following = await Follow.findAll({
        where: {
            artistId
        },
        include: [{
            model: User,
            attributes: ['id', 'username', 'email', 'pictureURL']
        }] 
    })
    return res.json({
        following
    })
}))

router.get('/:userId/:artistId', asyncHandler( async (req, res) => {
    const userId = req.params.userId;
    const artistId = req.params.artistId;

    console.log('Get route!');

    const follow = await Follow.findOne({
        where: {
            userId, artistId
        }
    })

    if(follow) {
        return true;
    }else{
        return false;
    }
}))

router.post('/:userId/:artistId', requireAuth, asyncHandler( async (req, res) => {
    const userId = req.params.userId;
    const artistId = req.params.artistId;

    console.log('Post router!');

    const existingFollow = await Follow.findOne({
        where: {
            userId,
            artistId
        }
    })

    if(existingFollow){
        existingFollow.destroy();
        return null
    }else{
        const newFollow = await Follow.create({
            userId, artistId
        })
        return res.json({
            newFollow
        })
    }
}))


module.exports = router;