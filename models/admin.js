const { DataTypes } = require("sequelize");

const Admin = (sequelize) => {
  return sequelize.define("Admin", {
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    status: { 
      type: DataTypes.BOOLEAN, 
      defaultValue: true 
    },
  });

};

module.exports = Admin;
