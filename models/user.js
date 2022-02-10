const { DataTypes } = require("sequelize");

const User = (sequelize) => {
  return sequelize.define("User", {
    name: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    state: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    },
    profession: { type: DataTypes.STRING },
    country: { type: DataTypes.TEXT },
    city: { type: DataTypes.TEXT },
  });

};

module.exports = User;
