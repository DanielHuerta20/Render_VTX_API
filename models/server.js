const express = require("express");
const cors = require("cors");
// const { dbConnection } = require("../database/config");
const { getDB, ActualizarDB } = require("../Agenda/getDB");
const fileUpload = require("express-fileupload");
const { dbConectionMysql } = require("../database/mysqlConfig");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = "/api/user";
    this.productsPath = "/api/product";
    this.authPath = "/api/auth";
    this.adminUsers = "/api/admin";
    this.favoritePath = "/api/favorite";
    this.shopPath = "/api/shop";
    this.counterPath = "/api/counter";
    this.onboardingPath = "/api/onboarding";
    this.seriesPath = "/api/series";
    this.analyticsPath = "/api/analytics";
    this.formatsPath = "/api/formats";
    this.files = "/api/files"
    this.professions = "/api/profession"
    // router testing
    this.testPath = "/api/test";

    // conectar a DB
    this.conectDB();

    // middlewares
    this.middlewares();
    // rutas de app
    this.routes();
  }

  async conectDB() {
    await dbConectionMysql();
    // actualizar DB servicio de oracle
    getDB.start();
    ActualizarDB();
  }

  middlewares() {
    // cors
    
    this.app.use(cors());

    this.app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      // res.header('Access-Control-Allow-Origin', 'http://localhost:8081');
      res.header(
        "Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
      );
      res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, DELETE"
      );
      res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
      next();
    });

    // parseo y lectura de body
    this.app.use(express.json());

    // directorio publico
    this.app.use(express.static("public"));

    // fileUpload
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/temp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.usersRoutePath, require("../routes/user"));
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.adminUsers, require("../routes/admin"));
    this.app.use(this.productsPath, require("../routes/product"));
    this.app.use(this.seriesPath, require("../routes/series"));
    this.app.use(this.formatsPath, require("../routes/format"));
    this.app.use(this.shopPath, require("../routes/shop"));
    this.app.use(this.counterPath, require("../routes/counter"));
    this.app.use(this.files, require("../routes/files"))
    this.app.use(this.professions,require("../routes/profession"))
    // this.app.use(this.favoritePath, require("../routes/favorite"));
    // this.app.use(this.onboardingPath, require("../routes/onboarding"));
    // this.app.use(this.testPath, require("../routes/test"));
    // this.app.use(this.analyticsPath, require("../routes/analytic"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("actual version is: V0.0.0");
      console.log("servidor corriendo en ", +this.port);
    });
  }
}

module.exports = Server;
