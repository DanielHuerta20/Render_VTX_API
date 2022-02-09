const { Router } = require("express");
const { check } = require("express-validator");
const { restorePassword, loginGlobal } = require("../controllers/auth");
const { validateCamposLogin } = require("../middlewares/validateCampos");

const router = Router();

router.post("/login",[
    check("email","El email es obligatorio").isEmail(),
    check("password","la contraseña es obligatorio").not().isEmpty(),
    validateCamposLogin
],loginGlobal)

router.post("/restorePassword",[
    check("email","El email es obligatorio").isEmail(), 
    check("password","Password es obligatoria").not().isEmpty(), 
    validateCamposLogin
],restorePassword)



module.exports = router;