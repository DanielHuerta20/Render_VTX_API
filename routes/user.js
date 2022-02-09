
const {Router} = require('express');
const { check } = require('express-validator');
const { userDelete, saveUser, getUsers } = require('../controllers/user');
const {validateCampos} = require('../middlewares/validateCampos');
const {emailExist,emailExistArko,exitUserById} = require('../helpers/db-validators')

const router = Router();

router.get('/',getUsers)

router.post('/',[
    check("email", "El correo no es valido").isEmail(),
    check("name", "El nombre es requerido").not().isEmpty(),
    check("password", "la contraseña es requerida y mayor a 6 caracteres ").isLength({min:6}),
    check("lastName", "El apellido es requerido").not().isEmpty(),
    check("email").custom(emailExist),
    validateCampos
],saveUser)

router.delete('/:id',[
    check("id").custom(exitUserById),
    validateCampos
],userDelete)

module.exports =router;