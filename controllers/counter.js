const { response } = require("express");
const { fakeCounter } = require("../database/fakeDatabase");
const { burbuja } = require("../helpers/burbuja");

const addPointCounter = async(req,res=response)=>{
    const {id} = req.params;
    const productClik = fakeCounter.find(count => {return count.id === parseInt(id)})
    if(!productClik){
        return res.status(400).json({        
            msg:"no existe el id"
        })
    }
    
    const today = new Date().toISOString().slice(0,10)
    const isfind = productClik.dates.find(element=>element.date===today)
    console.log(isfind);
    if(!isfind){
        productClik.dates = [...productClik.dates, {
            date: today,
            total: 1
        }]
        productClik.total = parseInt(parseInt(productClik.total))+1
    }
    else{
        const index = productClik.dates.findIndex(element=>element.date===today)
        let updated = productClik.dates
        updated[index] = {date:today,total:updated[index].total+1}
        productClik.total = parseInt(parseInt(productClik.total))+1
        productClik.dates = updated
    }
    res.json({        
        msg:"Agregado correctamente",
        position:productClik.total+1
    })
}

const getCounterList = async (req,res=response)=>{
    const list  = fakeCounter.filter(count => { return count.platform === 'vitromex' && count.total > 0})
    const order = burbuja(list)
    res.json({
        msg:"ok",
        list: order
    })
} 
const getCounterListArko = async (req,res=response)=>{
    const list  = fakeCounter.filter(count => { return count.platform === 'arko' && count.total > 0})
    const order = burbuja(list)
    res.json({
        msg:"ok",
        list: order
    })
} 

module.exports ={
    addPointCounter,
    getCounterList,
    getCounterListArko
}
