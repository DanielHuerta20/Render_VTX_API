const { Sequelize } = require("sequelize");

const dbConectionMysql = async () => {
  try {
    const sequelize = new Sequelize(
      process.env.NAME_DATABASE,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      {
        host: process.env.HOST_DATABASE,
        dialect: "mysql",
      }
    );
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    return sequelize
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectarse");
  }
};

module.exports = {
  dbConectionMysql,
};
