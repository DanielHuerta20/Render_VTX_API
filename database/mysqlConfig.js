const { Sequelize } = require("sequelize");
const Admin = require("../models/admin");
const Format = require("../models/format");
const Product = require("../models/product");
const Render = require("../models/render");
const Serie = require("../models/serie");
const Thumbnail = require("../models/thumbnail");
const User = require("../models/user");

const sequelize = new Sequelize(
  process.env.NAME_DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.HOST_DATABASE,
    dialect: "mysql",
    logging:false
  }
);
const AdminModel = Admin(sequelize);
const UserModel = User(sequelize);
const ProductModel  = Product(sequelize);
const RenderModel = Render(sequelize);
const ThumbnailModel = Thumbnail(sequelize);
const SerieModel = Serie(sequelize);
const FormatModel = Format(sequelize);

const dbConectionMysql = async () => {
  try {
    //! force = true =>  elimina la tbala y la vuelve a levantar sin datos
    //! alter = true =>  actualiza nombre de las tablas si lo detecta
    await sequelize.sync({ force: false, alter: false });
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log('Error', error);
  }
}


module.exports = {
  UserModel,
  AdminModel,
  FormatModel,
  ProductModel,
  RenderModel,
  ThumbnailModel,
  SerieModel,
  dbConectionMysql
};
