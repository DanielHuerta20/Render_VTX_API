const { Router } = require("express");
const { check } = require("express-validator");
const { uploadRender } = require("../controllers/files");
// const { existFavoriteId,exitUserById } = require("../helpers/db-validators");
// const { validateCampos } = require("../middlewares/validateCampos");

const router = Router();

router.post('/uploadfile',[],uploadRender)



module.exports = router;