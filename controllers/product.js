const azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');
const {response } = require('express') ;
const { fakeProduct } = require('../database/fakeDatabase');
const { ProductModel,RenderModel, ThumbnailModel } = require('../database/mysqlConfig');


const productGet =async (req,res = response) => {
    const productsDataBase = await ProductModel.findAll({
        where: {
        available: true
        }}
        )
        onGetRendersToProducts(productsDataBase,(productsWhitRender)=>{
            onGetThumbnailsToProducts(productsWhitRender,(products)=>{
                res.json({
                    AlltotalProducts:productsDataBase.length,
                    toalProductsInThisQuery:productsDataBase.length,
                    products:products
                })
            })
        })
}
const productGetComplete =async (req,res = response) => {
    const productsDataBase = await ProductModel.findAll()
        onGetRendersToProducts(productsDataBase,(productsWhitRender)=>{
            onGetThumbnailsToProducts(productsWhitRender,(products)=>{
                res.json({
                    AlltotalProducts:productsDataBase.length,
                    toalProductsInThisQuery:productsDataBase.length,
                    products:products
                })
            })
        })
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
                return {...product.dataValues,renders:[]}
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
                return {...product,thumbnail:[]}
            }
        })
    )
    callback(productsWhitImg)
}

const addRenderToProduct = async (req,res = response) => {
    const {id,url} = req.body
    const productToAddRender = await ProductModel.findAll({
        where:{
            id,
        }
    })
    if(productToAddRender){
        const renderAdd = await RenderModel.create({url,productId:id})
        res.json({
            renderAdd,
            id,url,
            productToAddRender
        })
    }
    else{
        res.status(404).json({
            error:'product not found'
        })
    }
}
const addBigImgToProduct = async (req,res=response)=>{
    const {id,url} = req.body
    const productToAddBigImg = await ProductModel.findOne({
        where:{
            id,
        }
    })
    if(productToAddBigImg){
        await productToAddBigImg.update(
            {
                bigImg:url
            }
        )
        await productToAddBigImg.save();
        res.json({
            id,url,
            productToAddBigImg
        })
    }
    else{
        res.status(404).json({
            error:'product not found'
        })
    }

}

const addThumbnailToProduct = async (req,res = response) => {
    const {id,url} = req.body
    const productToThumbnail = await ProductModel.findAll({
        where:{
            id,
        }
    })
    if(productToThumbnail){
        const thumbnailAdd = await ThumbnailModel.create({url,productId:id})
        res.json({
            thumbnailAdd,
            id,url,
            productToThumbnail
        })
    }
    else{
        res.status(404).json({
            error:'product not found'
        })
    }
}

const getProductById = async(req,res = response) => {
    const {id} = req.params;
    const product  = await ProductModel.findAll({
        where: {
          id: id,
          available: true
        }
      });
    
      const renders =  await RenderModel.findAll({
        where:{
            productId:id
        }
    })
      const thum =  await ThumbnailModel.findAll({
        where:{
            productId:id
        }
    })
   const finalData = {...product[0].dataValues,renders : [...renders],thumbnail:[...thum]}
    
    res.json(finalData)
}

const disableAll =async (req,res = response) => {
    const products = fakeProduct.map(product => {
        return {
            ...product,
            available: false
        }
    })   
    console.log("disbaled all products", products)
    res.json({
        deshabilidtados:"todos"
    })
}


// const getProductsArko= async (req,res=response)=>{
//     const products =  fakeProduct.filter(product => {
//         if(product.available && product.branding === 'ARKO'){
//             return product
//         }
//     })
//     res.json({
//         toalProductsInThisQuery:products.length,
//         products
//     })
// }
// const getProductsVitromexCMS = async (req,res=response)=>{
//     const products =  fakeProduct.filter(product => {return product.branding === 'VITROMEX'})
//     res.json({
//         toalProductsInThisQuery:products.length,
//         products
//     })
// }

// const getProductsARKOCMS = async (req,res=response)=>{
//     const products =  fakeProduct.filter(product => {return product.branding === 'ARKO'})
//     res.json({
//         toalProductsInThisQuery:products.length,
//         products
//     })
// }


// const getProductsVitromex= async (req,res=response)=>{
//     const products =  fakeProduct.filter(product => {
//         if(product.available && product.branding === 'VITROMEX'){
//             return product
//         }
//     })   
//     res.json({
//         toalProductsInThisQuery:products.length,
//         products
//     })
// }


const changeStatusProduct = async(req,res = response) =>{
    const {id,available} = req.body
    const product =await ProductModel.findOne({where:{id}})
    if(product ){
        await product.update({available:available})
        await product.save();
        res.json({
            msg:"status cambio",
        })
    }
    else{
        res.status(404).json({
            error:'el producto no existe'
        })
    }
    
}

const verifyAndUploadStatusSerie = async(product,available)=>{
    const ser = Serie.find({name:product.serie})   
    if(available === true || available === "true"){
       await ser.updateOne({available:true})
       console.log("serie esta en true")
    }
    else{
        const exist =await Product.find({serie:product.serie})
        let numberProducts = exist.length
        exist.forEach((prodct)=>{
            if(prodct.available === false){
                numberProducts--
            }
        })
        if(numberProducts <= 0){
            await ser.updateOne({available:false})
            console.log("series esta en false")
        }
    }
}

const changeStatusIsNew = async(req,res = response) =>{
    const {id,isNew} = req.body
    const product = fakeProduct.find(product => {return product.id === parseInt(id)})
    product.isNewProduct = isNew
    res.json({
        msg:`el estatus del producto ${product.name} cambio a ${isNew}`,
    })
}

const uploadProductsOptions = async(req,res = response)=>{
    const {id:idProduct, camp, value} = req.body
    if(camp!="name"  &&  camp!="textureWidth" && camp!="textureHeight" && camp!="aplications"){
        return res.status(400).json({
            msg:"el campo a cambiar no es valido"
        })
    }
    if(camp === "aplications" && typeof value != "object"){
        return res.status(400).json({
            msg:"tiene que ser un Array"
        })
    }
    const product = await Product.findById(idProduct)
    await product.updateOne({[camp]:value})
    res.json({
        msg:"ok",
        [camp]:value
    })
} 

const uploadProductImg = async(req,res = response)=>{

    if(!req.files || Object.keys(req.files).length ===0 ){
        res.status(400).json({
            msg:"No hay archivosde imagenes que subir"
        })
    }
    const { id:idProduct, camp} = req.body
    const {file} = req.files
    uploadAzureImg(file,process.env.AZURE_BOLB_CONTAINER_NAME,async (url)=>{
        const product = await Product.findById(idProduct)
        await product.updateOne({[camp]:url})
        res.json({
            msg:"ok",
            url
        })
    })
}

const uploadProductImgRender = async (req,res = response)=>{
    if(!req.files || Object.keys(req.files).length ===0 ){
        res.status(400).json({
            msg:"No hay archivosde imagenes que subir"
        })
    }
    const { id:idProduct, positionArray} = req.body
    if(positionArray<-1 || positionArray>3){
        return res.status(400).json({
            msg:"Esa posicion no es valida",
            positionInvalid: positionArray
        })
    }
    const {file} = req.files
    uploadAzureImg(file,process.env.AZURE_BOLB_CONTAINER_NAME_RENDERS,async (url)=>{
        const product = await Product.findById(idProduct)
        let renderToUpload = product.renders
        renderToUpload[positionArray] = url
        await product.updateOne({renders:renderToUpload})
        return res.json({
            msg:"ok",
            url,
            renders:renderToUpload
        })
    })
    
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

const deleteImgProduct = async (req,res = response)=>{
    const {id} = req.body;
    const img = await RenderModel.findOne({
        where: {id:id}
    })
    if(img){
        await img.destroy()
        res.json({ok:'eliminada'})
    }
    else{
        res.json({
            error:"no existe la imagen"
        })
    }
}
const deleteImgThumbnail = async (req,res = response)=>{
    const {id} = req.body;
    const img = await ThumbnailModel.findOne({
        where: {id:id}
    })
    if(img){
        await img.destroy()
        res.json({ok:'eliminada'})
    }
    else{
        res.json({
            error:"no existe la imagen"
        })
    }
}


module.exports={
    productGet,
    addBigImgToProduct,
    productGetComplete,
    addThumbnailToProduct,
    addRenderToProduct,
    deleteImgThumbnail,
    getProductById,
    changeStatusProduct,
    uploadProductImg,
    uploadProductImgRender,
    changeStatusIsNew,
    uploadProductsOptions,
    deleteImgProduct,
    disableAll
}