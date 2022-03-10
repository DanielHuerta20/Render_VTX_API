const azure = require('azure-storage');
const { v4: uuidv4 } = require('uuid');

const uploadRender = async(req,res=response)=>{

    if(!req.files || Object.keys(req.files).length ===0 ){
        res.status(400).json({
            msg:"No hay archivosde imagenes que subir"
        })
    }
    // const { id:idProduct} = req.body
    
    const {file} = req.files
    uploadAzureImg(file,process.env.AZURE_BOLB_CONTAINER_NAME_RENDERS,async (url)=>{
        return res.json({
            msg:"ok",
            url,
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

module.exports ={
    uploadRender
}