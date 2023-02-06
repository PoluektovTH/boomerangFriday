'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scores extends Model {
    static associate(models) {
    }
  }
  Scores.init({
    PlayerName: DataTypes.TEXT,
    FinalScore: DataTypes.INTEGER,
    TimeOfSurvival: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Scores',
  });
  return Scores;
};