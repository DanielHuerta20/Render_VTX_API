const { response} = require("express");
const { fakeFormats, fakeProduct } = require("../database/fakeDatabase");
const { FormatModel, ProductModel } = require("../database/mysqlConfig");

const getAllFormats = async(req,res=response)=>{
    const formats =await FormatModel.findAll()
    res.json({
        formats
    })
}

const updateOneFormat =async(req,res=reponse)=>{
    const {id,rounded} = req.body
    const formatToUpdate =await FormatModel.findOne({
        where: {id: id}
    })
    if(formatToUpdate){
        const productsToUpdate =await ProductModel.findAll({
            where: {
                sized:formatToUpdate.format
            }
            // product => {return product.sizedDefault === formatToUpdate.format}
        })
        Promise.all(
            productsToUpdate.map( async product =>{
                // const productToUpdate = await ProductModel.findOne()
                await product.update({sized:rounded})
                await product.save()
            })
        )
        // console.log(productsToUpdate)
        await formatToUpdate.update({format:rounded})
        await formatToUpdate.save();

        // productsToUpdate.forEach(async(product) =>{
        //     productsUpdated.push(product.id)
        //     product.sized = rounded
        // })
        res.json({
            ok:"actualizado!",
            numberOfProductsUpdated:productsToUpdate.length,
            updatedProducts:productsToUpdate
        })
    }
    else{
        res.status(404).json({
            error:"El formato no encontrado"
        })
    }
}

module.exports={
    getAllFormats,
    updateOneFormat
}