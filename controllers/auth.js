const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { fakeUser } = require("../database/fakeDatabase");

const loginGlobal = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // verificar si el email existe
    const user = fakeUser.find(user => {return user.email === email})
    if (!user) {
      return res.status(400).json({
        msg: "Usuario/password no son correctos",
      });
    }

    // usuario activos
    if (!user.state) {
      return res.status(400).json({
        msg: "Usuario/password no son correctos",
      });
    }

    // verificar password
    const isValidPassword = bcryptjs.compareSync(password, user.password)
    // const isValidPassword = password === user.password;
    if (!isValidPassword) {
      return res.status(400).json({
        msg: "Usuario/password no son correctos",
      });
    }

    // // generar JWT
    return res.json({
      state: user.state,
      favorites: user.favorites,
      id: user.id,
      name: user.name,
      email: user.email,
      lastName: user.lastName,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal hable con el administrador",
    });
  }
};

const restorePassword = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    const user = fakeUser.find(user => {return user.email === email})
    if (!user) {
      return res.status(400).json({
        msg: "Ususario/password no son correctos",
      });
    }
    // Encriptar
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salio mal hable con el administrador",
    });
  }
};

module.exports = {
  restorePassword,
  loginGlobal
};
