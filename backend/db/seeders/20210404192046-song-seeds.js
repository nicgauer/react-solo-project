'use strict';
const faker = require('faker');

const songs = [
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617563448102.mp3',
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617563469486.mp3',
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617563495915.mp3',
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617563532460.mp3',
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617563556401.mp3',
  'https://soundcampify.s3.us-east-2.amazonaws.com/1617563589894.mp3',
]

const randomNumber = (max) => {
  return Math.floor(Math.random() * max)
}

const generateSongArray = (num) => {
  let result = [];
  for(let i = 0; i < num; i++){
    result.push({
      name: faker.lorem.word(),
      songURL: songs[randomNumber(songs.length - 1)],
      trackNumber: randomNumber(10),
      releaseId: randomNumber(39) + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  }
  return result
}

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Songs', generateSongArray(100), {});
  
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Songs', null, {});
  }
};
