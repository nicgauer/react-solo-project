'use strict';

const generateFollows = () => {
  let result = [];
  for(let user = 1; user < 40; user++) {
    for(let artist = 1; artist < 20; artist++) {
      result.push({
        userId: user,
        artistId: artist,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
  }
  return result;
} 

const follows = generateFollows();

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Follows', follows, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Follows', null, {});
  }
};
