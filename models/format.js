const { DataTypes } = require("sequelize");

const Format = (sequelize) => {
  return sequelize.define("Format", {
    format: { type: DataTypes.STRING },
    sizedDefault: { type: DataTypes.STRING },
  });

};

module.exports = Format;
