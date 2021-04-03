import { csrfFetch } from './csrf';

export const getUserFollows = async (userId) => {
    const follows = await csrfFetch(`/api/follows/u/${userId}`)
    const result = await follows.json();
    return result
}

export const getArtistFollowers = async (artistId) => {
    const followers = await csrfFetch(`/api/follows/a/${artistId}`)
    const result = await followers.json();
    return result
}

export const followButton = async (userId, artistId) => {
    const follow = await csrfFetch(`/api/follows/${userId}/${artistId}`, {
        method: 'POST'
    })
    if(follow){
        return true;
    }else{
        return false;
    }
}

export const findFollow = async (userId, artistId) => {
    const follow = await csrfFetch(`/api/follows/${userId}/${artistId}`);
    return follow;
}