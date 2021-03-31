'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    releaseId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    songURL: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    trackNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enableDownload: {
      type: DataTypes.BOOLEAN,
    },
    about: {
      type: DataTypes.TEXT,
    },
    credits: {
      type: DataTypes.TEXT
    },
  }, {});
  Song.associate = function(models) {
    Song.belongsTo(models.Release, { foreignKey: 'releaseId'})
  };

  return Song;
};