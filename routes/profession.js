const { Router } = require("express");
const { check } = require("express-validator");
const { getAllProfessions, addNewProfession, updateProfession, delteProfession } = require("../controllers/profession");
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

router.delete('/delete',[
    check("id","Es necesario el id del formato").not().isEmpty(),
    validateCampos
],delteProfession)

module.exports = router;