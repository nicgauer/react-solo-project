'use strict';
module.exports = (sequelize, DataTypes) => {
  const Release = sequelize.define('Release', {
    artistId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    coverURL: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    releaseDate: {
      type: DataTypes.DATE,
    },
    about: {
      type: DataTypes.TEXT,
    },
    credits: {
      type: DataTypes.TEXT
    },
  }, {});
  Release.associate = function(models) {
    Release.belongsTo(models.Artist, { foreignKey: 'artistId'})
  };

  Release.newRelease = async function({artistId, coverURL, name, releaseDate, bio=null, credits=null}){
    const release = await Release.create({ 
      artistId, coverURL, name, releaseDate, bio, credits
    })
    return await Release.findByPk(release.id);
  }

  return Release;
};