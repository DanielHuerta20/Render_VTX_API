const azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
const { fakeSeries } = require('../database/fakeDatabase');
const { SerieModel, ProductModel, RenderModel, ThumbnailModel } = require('../database/mysqlConfig');

const disableAllseries =async (req,res = response) => {
    const series = fakeSeries.map(serie => {return {...serie, available: false}})
    console.log("disbaled all series", series)
    res.json({
        deshabilidtados:"todos series"
    })
}


// este NO regresa el campo "dateCreated"
const getAllSeries =async (req,res = response) => {
    const series =await SerieModel.findAll() 
    res.json({
        total: series.length,
        series
    })
}

const getProductsPerSerie = async (req,res = response)=>{
    const {id} =  req.body
    const serie = await SerieModel.findOne({
        where: {id:id}
    })
    if(serie){
        const products =await ProductModel.findAll({
            where: {
                serie:serie.name,
                available:true,
            }
        })
        onGetRendersToProducts(products,(productsWhitRenders)=>{
            onGetThumbnailsToProducts(productsWhitRenders,(productsComplete)=>{
                res.json(productsComplete)
            })
        })
    }
    else{
        res.status(404).json({
            error: 'sserie not found'
        })
    }
}

const onGetRendersToProducts =  async (productsDataBase,callback)=>{
    const productsWhitImg = await Promise.all(
        productsDataBase.map( async (product)=>{
            const renders = await RenderModel.findAll({
                where:{
                    productId:product.id
                }
            })
            if(renders.length>0){            
                return {...product.dataValues,renders:[...renders]}
            }
            else{
                return product
            }
        })
    )
    callback(productsWhitImg)
}

const onGetThumbnailsToProducts =  async (productsDataBase,callback)=>{
    const productsWhitImg = await Promise.all(
        productsDataBase.map( async (product)=>{
            const thumbnail = await ThumbnailModel.findAll({
                where:{
                    productId:product.id
                }
            })
            if(thumbnail.length>0){            
                return {...product,thumbnail:[...thumbnail]}
            }
            else{
                return product
            }
        })
    )
    callback(productsWhitImg)
}



const uploadSerieImg = async(req,res = response)=>{
    const {id,url} = req.body
    const serieToAddThumbnail = await SerieModel.findOne({
        where:{
            id,
        }
    })
    if(serieToAddThumbnail){
        await serieToAddThumbnail.update({img:url})
        const result =  await serieToAddThumbnail.save();
        res.json({
            ok:true,
            message:'imagen actualizada',
            result
        })
    }
    else{
        res.status(404).json({
            error:'serie not found'
        })
    }
}

const uploadAzureImg = async (file,blob, callBack)=>{
    const blobservice =await azure.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING);
    fileName = uuidv4()+file.name.replace(/ /g, "")
    if(file.tempFilePath){
        blobservice.createBlockBlobFromLocalFile(`${blob}`,fileName,file.tempFilePath,{
            contentType: 'image/jpeg'
         },
    function(error, result, response) {
       if (!error) {
           const url=  blobservice.host.primaryHost + `${blob}`+"/"+ fileName
           callBack(url)
       }
       else
       console.log(error)
     })
    }
}


module.exports={
    getProductsPerSerie,
    getAllSeries,
    uploadSerieImg,
    disableAllseries
}