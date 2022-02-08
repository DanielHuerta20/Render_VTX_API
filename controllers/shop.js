const {response } = require('express') ;
const { fakeShop } = require('../database/fakeDatabase');


const getAllShops =async (req,res = response) => {
    const shops = fakeShop.filter(shop => {return shop.status})
    const total = shops.length
    res.json({
        total,
        shops
    })
}

// este regresa el campo "dateCreated"
const getAllShopsCMS =async (req,res = response) => {
    const ie = fakeShop
    const shops = []
    ie.forEach(elm=>{
        shops.push( {
            status:elm.status,
            id:elm.id,
            name:elm.name,
            state:elm.state,
            city:elm.city,
            suburb:elm.suburb,
            street:elm.street,
            num :elm.num,
            phone: elm.phone,
            country:elm.country,
            lat:elm.lat,
            lng :elm.lng,
            dateCreated:elm.dateCreated,
         } )
     })
    const total = fakeShop.length
    res.json({
        total,
        shops
    })
}

const changeStatusStore = async(req,res = response) =>{
    const {id,status} = req.body
    const store = fakeShop.find(shop => { return shop.id === parseInt(id)})
    store.status = status
    res.json({
        msg:"status cambio",
    })
}

module.exports={
    getAllShops,
    getAllShopsCMS,
    changeStatusStore
}