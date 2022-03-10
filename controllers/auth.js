const { response } = require("express");
const bcryptjs = require("bcryptjs");
const { fakeUser } = require("../database/fakeDatabase");
const { UserModel } = require("../database/mysqlConfig");

const loginGlobal = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    // verificar si el email existe
    // const user = fakeUser.find(user => {return user.email === email})
    const user = await UserModel.findOne({
      where: { email}
    })
    if (!user) {
      return res.status(400).json({
        msg: "Usuario/password no son correctos x",
      });
    }
    const userExist = user.dataValues
    // usuario activos
    if (!userExist.state) {
      return res.status(400).json({
        msg: "Usuario/password no son correctos y",
      });
    }

    // verificar password
    const isValidPassword = bcryptjs.compareSync(password, userExist.password)
    // const isValidPassword = password === user.password;
    if (!isValidPassword) {
      return res.status(400).json({
        msg: "Usuario/password no son correctos z",
      });
    }
    // // generar JWT
    return res.json({
      state: userExist.state,
      favorites: userExist.favorites,
      id: userExist.id,
      name: userExist.name,
      email: userExist.email,
      lastName: userExist.lastName,
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
    const user = await UserModel.findOne({
      where: { email}
    })
    if (!user) {
      return res.status(400).json({
        msg: "Ususario no son correctos",
      });
    }
    // Encriptar
    const salt = bcryptjs.genSaltSync();
    await user.update({password:bcryptjs.hashSync(password, salt)})
    await user.save();
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
