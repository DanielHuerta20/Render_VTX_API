const { Router } = require("express");
const { check } = require("express-validator");
const {
  productGet,
  
  
  getProductById,
  
  
  changeStatusProduct,
  changeStatusIsNew,
  deleteImgProduct,
  disableAll,
  addRenderToProduct,
  addThumbnailToProduct,
} = require("../controllers/product");
const { exitProductById } = require("../helpers/db-validators");
const { validateCampos } = require("../middlewares/validateCampos");
const { validateJwt } = require("../middlewares/validateJwt");

const router = Router();


// used
router.get("/", productGet);

router.post("/addrender",addRenderToProduct)

router.post("/addthumbnail",addThumbnailToProduct)


// 
router.post(
  "/chagestatus",
  [
    validateJwt,
    check("id").custom(exitProductById),
    check("available", "No tienes el estado a cambiar").not().isEmpty(),
    validateCampos,
  ],
  changeStatusProduct
);

router.post(
  "/chagestatusNew",
  [
    validateJwt,
    check("id").custom(exitProductById),
    check("isNew", "No tienes el estado a cambiar").not().isEmpty(),
    validateCampos,
  ],
  changeStatusIsNew
);

router.post(
  "/deleteimg",
  [
    validateJwt,
    check("id", "no tienes el id del producto").not().isEmpty(),
    check("positionImg", "No tienes la posicion a cambiar ").not().isEmpty(),
    check("id").custom(exitProductById),
    validateCampos,
  ],
  deleteImgProduct
);

router.get("/one/:id",[
  check("id").custom(exitProductById),
  validateCampos
],getProductById)

router.get('/disabledall',[],disableAll)

//? Azure
// router.post("/upload-img",[
//     validateJwt,
//     check("id").custom(exitProductById),
//     validateCampos
// ],uploadProductImg)

// router.post("/upload-img-render",[
//     validateJwt,
//     check("id").custom(exitProductById),
//     check("positionArray","es necesaria la posicion del array 0-1-2").not().isEmpty(),
//     validateCampos
// ],uploadProductImgRender)

// router.post("/upload-options",[
//     validateJwt,
//     check("id").custom(exitProductById),
//     check("camp","es necesario el campo a cambiar").not().isEmpty(),
//     check("value","es necesario el valor del campo a cambiar").not().isEmpty(),
//     validateCampos
// ],uploadProductsOptions)

module.exports = router;
