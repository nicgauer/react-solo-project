'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Artists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(150),
      },
      customURL: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
      },
      pictureURL: {
        type: Sequelize.STRING
      },
      bannerURL: {
        type: Sequelize.STRING
      },
      backgroundURL: {
        type: Sequelize.STRING
      },
      pageColor: {
        type: Sequelize.STRING
      },
      textColor: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      location: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users' } 
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
    return queryInterface.dropTable('Artists');
  }
};