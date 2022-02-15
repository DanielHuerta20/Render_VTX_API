const { DataTypes } = require("sequelize");

const Thumbnail = (sequelize) => {
  return sequelize.define("Thumbnail", {
    url: { type: DataTypes.STRING },
    productId : {type: DataTypes.STRING}    
  });

};

module.exports = Thumbnail;
