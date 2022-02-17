const { DataTypes } = require("sequelize");

const Typologie = (sequelize) => {
  return sequelize.define("Typologie", {
    name: { type: DataTypes.STRING },
    available: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    },
    platform:{  type: DataTypes.STRING},
    img: { type: DataTypes.STRING },
    // color: { type: DataTypes.STRING },
    // finish: { type: DataTypes.STRING },
    // typologies: {type: DataTypes.STRING},
    // pzasXpallet: { type: DataTypes.STRING },
  });

};

module.exports = Typologie;
