'use strict';
const { Release } = require('./index');

module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: {
      allowNull: false,
      type:DataTypes.STRING,
    },
    customURL: {
      allowNull: false,
      type:DataTypes.STRING,
      unique:true,
    },
    pictureURL: {
      type:DataTypes.STRING,
    },
    bio: {
      type:DataTypes.TEXT,
    },
    location: {
      type:DataTypes.STRING,
    },
    userId: {
      type:DataTypes.INTEGER
    },
  }, {});
  Artist.associate = function(models) {
    Artist.belongsTo(models.User, { foreignKey: 'userId' })
    Artist.hasMany(models.Release, { foreignKey: 'artistId' })
  };

  Artist.getAssociatedReleases = () => {
    const releases = Release.findAll({
      where: { 
        artistId
      },
    })
    return releases;
  }

  return Artist;
};