const { Router } = require("express");
const { check } = require("express-validator");
const { getAllProfessions, addNewProfession, updateProfession } = require("../controllers/profession");
const { validateCampos } = require("../middlewares/validateCampos");

const router = Router();

router.get('/',getAllProfessions)

router.post('/create',[
    // check("id","Es necesario el id del formato").not().isEmpty(),
    check("profession","Es necesaria la profession").not().isEmpty(),
    validateCampos
],addNewProfession)

router.post('/update',[
    check("id","Es necesario el id del formato").not().isEmpty(),
    check("profession","Es necesaria la profession").not().isEmpty(),
    validateCampos
],updateProfession)

module.exports = router;