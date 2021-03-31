'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      releaseId: {
        allowNull: false,
        references: { model: 'Releases'},
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      songURL: {
        allowNull: false,
        type: Sequelize.STRING
      },
      trackNumber: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      enableDownload: {
        type: Sequelize.BOOLEAN
      },
      about: {
        type: Sequelize.TEXT
      },
      credits: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Songs');
  }
};