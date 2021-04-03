'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    artistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  Follow.associate = function(models) {
    Follow.belongsTo(models.User, { foreignKey: 'userId' });
    Follow.belongsTo(models.Artist, { foreignKey: 'artistId' });
  };
  return Follow;
};