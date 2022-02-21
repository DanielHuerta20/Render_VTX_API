const { Router } = require("express");
const { check } = require("express-validator");
const {
  getAllSeries,
  uploadSerieImg,
  disableAllseries,
  getProductsPerSerie,
} = require("../controllers/serie");
const { validateCampos } = require("../middlewares/validateCampos");
const { validateJwt } = require("../middlewares/validateJwt");

const router = Router();

router.get("/", getAllSeries);

router.post("/uploadimg",uploadSerieImg)

router.post("/products-series",getProductsPerSerie)

router.get("/disabledall", [], disableAllseries);

//? azure
// router.post(
//   "/upload-img",
//   [validateCampos],
//   uploadSerieImg
// );


module.exports = router;
