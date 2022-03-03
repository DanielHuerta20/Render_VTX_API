const { DataTypes } = require("sequelize");

const Product = (sequelize) => {
  return sequelize.define("Product", {
    name: { type: DataTypes.STRING },
    available: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    },
    dateCreated: { type: DataTypes.DATEONLY    },
    sized: { type: DataTypes.STRING },
    family: { type: DataTypes.STRING },
    rectified : { type: DataTypes.STRING },
    bigImg:{  type: DataTypes.STRING},
    idFromOracle: { type: DataTypes.STRING },
    serie:{  type: DataTypes.STRING},
    color: { type: DataTypes.STRING },
    finish: { type: DataTypes.STRING },
    typologies: {type: DataTypes.STRING},
    pzasXpallet: { type: DataTypes.STRING },
  });

};

module.exports = Product;
