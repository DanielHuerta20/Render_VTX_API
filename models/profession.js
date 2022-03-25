const { DataTypes } = require("sequelize");

const Profession = (sequelize) => {
  return sequelize.define("Profession", {
    profession: { type: DataTypes.STRING },
    status: {
        type: DataTypes.BOOLEAN, 
        defaultValue: true  },
  });

};

module.exports = Profession;
