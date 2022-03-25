const { response} = require("express");
const { ProfessionModel } = require("../database/mysqlConfig");
const Profession = require("../models/profession");

const getAllProfessions = async(req,res=response)=>{
    const professions =await ProfessionModel.findAll({where: {status:true}})
    res.json({
       profession:professions
    })
}

const addNewProfession = async(req,res=response)=>{
    const {profession} = req.body;
    if(profession){
        const existProfession = await ProfessionModel.findOne({where:{profession}})
        if(existProfession){
            await existProfession.update({status:true})
            await existProfession.save()
            res.json({
                msg:'creado correctamente'
            })
        }
        else{
            await ProfessionModel.create({profession,status:true})
        res.json({
            msg:'creado correctamente'
        })
        }
    }
    else{
        res.status(404).json({
            error:'no se encontro la profesion en el body'
        })
    }
}

const updateProfession = async(req,res=response)=>{
    const {profession,id} = req.body;
    if(profession && id){
       const newUpdate =  await ProfessionModel.findOne({
            where: {id:id},
        })
        await newUpdate.update({profession:profession})
        await newUpdate.save()
        res.json({
            msg:"actualizado correctamente"
        })
    }
    else{
        res.status(404).json({
            error:'no se encontro toda la informacion en  el body'
        })
    }
}

module.exports={
    getAllProfessions,
    addNewProfession,
    updateProfession,
}