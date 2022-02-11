
const { fakeUser, fakeProduct, fakeShop, fakeFavorite } = require("../database/fakeDatabase");
const { UserModel, ProductModel } = require("../database/mysqlConfig");


const emailExist = async (email = "") =>{
    const exist =  await UserModel.findOne({where: {email: email}})
    if(exist){
        throw new Error("Email ya registrado")
    }
}
const emailExistArko = async (email = "") =>{
    const exist =  fakeUser.find(user => {return user.email === email && user.platform === "arko"})
    if(exist){
        throw new Error("Email ya registrado")
    }
}

const exitUserById =async ( id ) => {
    const exist = fakeUser.find(user => {return user.id === parseInt(id)})
    if(!exist){
        throw new Error(`El id no existe ${id}`);
    }
}
const exitProductById =async ( id ) => {
    const exist =await ProductModel.findAll({
        where: {
          id: id,
          available: true
        }
      });
    if(!exist || exist.length === 0){
        throw new Error(`El producto con el id no existe ${id}`);
    }
}
const existShopById =async ( id ) => {
    const exist = fakeShop.find(shop => {return shop.id === parseInt(id)})
    if(!exist){
        throw new Error(`la tienda con el id no existe ${id}`);
    }
}

const existFavoriteId =async ( id ) => {
    const exist = fakeFavorite.find(favorite => {return favorite.id === parseInt(id)})
    if(!exist){
        throw new Error(`El id no existe ${id}`);
    }
}


module.exports = {
    emailExist,
    exitUserById,
    exitProductById,
    existFavoriteId,
    existShopById,
    emailExistArko
}