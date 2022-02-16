const cron = require('node-cron');
const fetch = require('node-fetch');
const Product = require('../models/product')
// const Shop = require('../models/shop');
// const Serie = require('../models/serie')
// const Typologies = require('../models/typologies')
// const Format = require("../models/format");
const { ProductModel, SerieModel } = require('../database/mysqlConfig');

const getDB = cron.schedule('0 1 * * *', () => {
    ActualizarDB();
  });

  const ActualizarDB = async() => {
      console.log(`obteniendo productos de: ${process.env.GET_PRODUCTS}`);
      // TODO: aqui modificar hacia donde apunta el link para obtener los productos de Oracle
      // solo cambiar el link 
      fetch(`${process.env.GET_PRODUCTS}`,{
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })
        .then((res) =>res.json())
        .then(async(response)=>{
          // console.log(response)

            // console.log(response.result.P_InfoProductos_RowSet)
            const productsOracle = filterDataNotDuplicate(response.db.result.P_InfoProductos_RowSet,"CODIGO_ITEM");

            const productsOracleSeries = filterDataNotDuplicateSeries(response.db.result.P_InfoProductos_RowSet);
            await addSeries(productsOracleSeries);

            // const productsOracleTypologies = filterDataNotDuplicateTypologies(response.result.P_InfoProductos_RowSet);
            // await addTypologies(productsOracleTypologies);

            // const productOracleFormats = filterDataNotDuplicate(response.result.P_InfoProductos_RowSet,"FORMATO");
            // await addFormats(productOracleFormats);
            await Promise.all(
              productsOracle.map( async(element)=>{
                const exist =await ProductModel.findOne({
                  where: {idFromOracle:element.CODIGO_ITEM}
                })
                if(!exist){
                  let formatoProduct = element.FORMATO
                  const format = getFormatProduct(element,formatoProduct)
                   await ProductModel.create(format)
                }
               })
             )
      }).catch(err =>console.log(err))
      console.log(`obteniendo tiendas de: ${process.env.GET_TIENDAS}`);

       // TODO: aqui modificar hacia donde apunta el link para las tiendas 
      // solo cambiar el link 
      // fetch(`${process.env.GET_TIENDAS}`,{
      //   method: 'GET',
      //   headers: { 'Content-Type': 'application/json' },
      // })
      // .then(res=>res.json())
      // .then(async(response)=>{
      //   const tiendas = response.data
      //   if(tiendas){
      //     await Shop.collection.deleteMany({})
      //     tiendas.forEach(async (element)=>{
      //       const assaraydistribuid = element.Distribuidor.split('-')
      //       const name = assaraydistribuid[0] + ' - ' + element.Nombre
      //       const store = new Shop({
      //         name:name,
      //         country:element.pais,
      //         state:element.Estado,
      //         city:element.Municipio,
      //         suburb: element.colonia,
      //         street: element.Calle,
      //         num: element.numero,
      //         phone: element.TelefonoTienda,
      //         status: ((element.Latitud!='' && element.Longitud!='') && element.Nombre!='')?true:false,
      //         lat: element.Latitud,
      //         lng: element.Longitud,
      //         dateCreated:new Date().toISOString().slice(0,10),
      //       })
      //       await store.save()
      //       console.log("tienda guardada:"+ name)
      //     })
      //   }
      // })

  }
  
  const existProduct= async(id, callback)=>{
    // const exist = await Product.findOne({idFromOracle:id})
    const exist =false
    if(exist)
    callback(true) ;
    else  callback(false);
  }

  const filterDataNotDuplicate = (data,camp)=>{
    const arrValid =[]
    const productsOracle = []
            data.forEach( (element) => {
            if(arrValid.indexOf(element[camp]) === -1){
              arrValid.push(element[camp])
              productsOracle.push(element)
            }
          })
          console.log(productsOracle.length)
          return productsOracle;
  }

  const filterDataNotDuplicateSeries = (data)=>{
    const arrValid =[]
    const productsOracle = []
            data.forEach( (element) => {
            if(arrValid.indexOf(element.SERIE) === -1){
              arrValid.push(element.SERIE)
              productsOracle.push(element)
            }
          })
          console.log(productsOracle.length)
          return productsOracle;
  }

  const filterDataNotDuplicateTypologies = (data)=>{
    const arrValid =[]
    const productsOracle = []
            data.forEach( (element) => {
            if(arrValid.indexOf(element.DESC_TIPOLOGIA) === -1){
              arrValid.push(element.DESC_TIPOLOGIA)
              productsOracle.push(element)
            }
          })
          console.log(productsOracle.length)
          return productsOracle;
  }

  const getFormatProduct = (elem,formatoProduct)=>{
    const arr = elem.DESCRIPTION.split(" ")
    const end = arr.findIndex(el=>el==="CM")
    let name="";
    
    for (let index = 1; index < end-1; index++) {
        name += arr[index]+" "
    }
    return {
        dateCreated:new Date().toISOString().slice(0,10),
        idFromOracle:elem.CODIGO_ITEM,
        available:false, //TODO: cambiar  falso siempre que llega uno nuevo
        description:elem.DESCRIPTION,
        name:name.trim(),
        albedo:"",
        normal:"",
        roughness:(elem.BRILLO ==="BR")?'1':'0',
        smallPicture:"",        
        sized: formatoProduct,
        sizedDefault:elem.FORMATO,
        isNewProduct:true,
        family:elem.FAMILIA,
        branding:elem.DESC_MARCA,
        textureWidth:0,
        textureHeight:0,
        serie:elem.SERIE,
        color:elem.COLOR,
        finish:elem.DESC_BRILLO,
        typologies:elem.DESC_TIPOLOGIA,
        pzasXpallet:elem.PZASXPALLET,
        aplications:[],
        renders:[
          "",
          "",
          "",
        ]
    }
  }

  const addSeries =async (elements) => {
    await Promise.all(
      elements.map( async (element)=>{
        const exist =await SerieModel.findOne({
              where: {name:element.SERIE}
        })
        if(!exist){
        await SerieModel.create({
          name:element.SERIE,
          available:true,
          typologie:element.DESC_TIPOLOGIA,
          platform:(element.DESC_MARCA ==="VITROMEX")? 'vitromex':'arko',
          img:"",
        })
        console.log(`Serie guardada: ${element.SERIE}`)
      } 
      })
    )
    // elements.forEach(async (element) => {
    //   const exist =await SerieModel.findOne({
    //     where: {name:'as'}
    //   })
      // console.log(exist)
      // if(!exist){
      //   await SerieModel.create({
      //     name:element.SERIE,
      //     available:true,
      //     typologie:element.DESC_TIPOLOGIA,
      //     platform:(element.DESC_MARCA ==="VITROMEX")? 'vitromex':'arko',
      //     img:"",
      //   })
      //   console.log(`Serie guardada: ${element.SERIE}`)
      // }   
  }

  const addTypologies =async (elements) => {
    elements.forEach(async (element) => {
      const exist =await Typologies.findOne({name:element.DESC_TIPOLOGIA})
      if(!exist){
        const typologie = new Typologies({
          name:element.DESC_TIPOLOGIA,
          platform:(element.DESC_MARCA ==="VITROMEX")? 'vitromex':'arko',
          img:"",          
          dateCreated:new Date().toISOString().slice(0,10)
        })
        await  typologie.save()
        console.log(`typologia guardada: ${element.DESC_TIPOLOGIA}`)
      }      
    })
  }

  const addFormats =async(elements)=>{
    elements.forEach(async (element) => {
      const exist =await Format.findOne({format:element.FORMATO})
      if(!exist){
        const format = new Format({
          format:element.FORMATO,
          rounded:element.FORMATO
        })
        await  format.save()
        console.log(`formato guardada: ${element.FORMATO}`)
      }      
    })
  }

module.exports ={
    getDB,
    ActualizarDB
}