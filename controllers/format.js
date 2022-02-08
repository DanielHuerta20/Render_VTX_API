const { response} = require("express");
const { fakeFormats, fakeProduct } = require("../database/fakeDatabase");

const getAllFormats = async(req,res=response)=>{
    const formats = fakeFormats
    res.json({
        formats
    })
}

const updateOneFormat =async(req,res=reponse)=>{
    const {id,rounded} = req.body
    const formatToUpdate = fakeFormats.find(format => {return format.id === parseInt(id)})
    if(formatToUpdate){
        formatToUpdate.rounded = rounded
        const productsUpdated =[]
        const productsToUpdate = fakeProduct.filter(product => {return product.sizedDefault === formatToUpdate.format})
        productsToUpdate.forEach(async(product) =>{
            productsUpdated.push(product.id)
            product.sized = rounded
        })
        res.json({
            ok:"actualizado!",
            productsUpdated
        })
    }
    else{
        res.status(404).json({
            error:"Formato no encontrado"
        })
    }
}

module.exports={
    getAllFormats,
    updateOneFormat
}