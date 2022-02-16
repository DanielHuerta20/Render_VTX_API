const azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');
const { response } = require("express");
const { fakeSeries } = require('../database/fakeDatabase');
const { SerieModel, ProductModel } = require('../database/mysqlConfig');

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
        res.json(
            products
        )
    }
    else{
        res.status(404).json({
            error: 'sserie not found'
        })
    }
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