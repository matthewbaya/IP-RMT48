"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Matches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Matches.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Matches.belongsTo(models.User, {
        foreignKey: "liked_user_id",
      });
    }
  }
  Matches.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
      },
      liked_user_id: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Matches",
    }
  );
  return Matches;
};
