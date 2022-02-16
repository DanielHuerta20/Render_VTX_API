const { DataTypes } = require("sequelize");

const Serie = (sequelize) => {
  return sequelize.define("Serie", {
    name: { type: DataTypes.STRING },
    available: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    },
    typologie: { type: DataTypes.STRING },
    platform:{  type: DataTypes.STRING},
    img: { type: DataTypes.STRING },
    // color: { type: DataTypes.STRING },
    // finish: { type: DataTypes.STRING },
    // typologies: {type: DataTypes.STRING},
    // pzasXpallet: { type: DataTypes.STRING },
  });

};

module.exports = Serie;
