const { response } = require("express");
// const Admin = require("../models/admin")
const { genJWT } = require("../helpers/jwt");
const fetch = require("node-fetch");
const { fakeAdmin } = require("../database/fakeDatabase");
const { AdminModel } = require("../database/mysqlConfig");

const login = async (req, res = response) => {
  // 
  const { email, password } = req.body;
  const admin = await AdminModel.findOne({where:{email}})
  if (!admin || !admin.status) {
    return res.status(400).json({
      msg: "Ususario no adminitdo",
    });
  }

  // TODO: aqui colorcar el End point para consultar su servicio de autentificacion
  // si la llamada es de tipo POST solo cambiar el link de abajo
  // si la llamada es de algun otro tipo o necesita mas parametros editar la peticion en la linea 38

  consultingServiceClientAuthAdmin(
    `${process.env.POST_AUTH_ADMIN}`,
    email,
    password,
    async (response) => {
      // sutituir por si la variable bandera que verifique si la respuesta es correcta (id, response etc....)
      if (response.ok) {
        const token = await genJWT(admin.id);
        res.json({
          ok: true,
          token,
          msg: "entro",
          name: admin.name,
        });
      } else {
        res.status(404).json({
          msg: "Usuario no adminitdo service",
        });
      }
    }
  );
};

const consultingServiceClientAuthAdmin = async (
  url,
  email,
  password,
  callback
) => {
  fetch(`${url}?Username=${email}&Password=${password}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((res) => {
    if (res.status === 200) {
      callback({ ok: true });
    } else {
      callback({ ok: false });
    }
  });
  // callback({ ok: true });
};

const getAllAdmins = async (req, res = response) => {
  const admins =await AdminModel.findAll({
    where: {
      status:true
    }
  });
  res.json({
    admins,
  });
};

const createAdmin = async (req, res = response) => {
  const { name, email } = req.body;
  const adminexist =await AdminModel.findOne({where:{email:email}})
  if (adminexist) {
    return res.status(400).json({
      error: "ya existe administrador: " + email,
    });
  }
  const Addadmin = await AdminModel.create({name,email,status:true})
  // adm.sa;
  res.json({
    msg: "UserAdmin created!",
    Addadmin
  });
};

const deleteAdmin = async (req, res = response) => {
  const { id } = req.body;
  const admin = await AdminModel.findOne({where:{id:id}})
  if (!admin) {
    return res.status(400).json({
      error: "no existe el admin",
    });
  } else {
    admin.update({status:false})
    res.json({
      msg: "Admin eliminado!",
    });
  }
};

module.exports = {
  login,
  getAllAdmins,
  deleteAdmin,
  createAdmin,
};
