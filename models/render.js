const { DataTypes } = require("sequelize");

const Render = (sequelize) => {
  return sequelize.define("Render", {
    url: { type: DataTypes.STRING },
    productId : {type: DataTypes.STRING}    
  });

};

module.exports = Render;
