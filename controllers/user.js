const {response } = require('express') ;
const bcryptjs = require('bcryptjs');
const { fakeUser } = require('../database/fakeDatabase');
// const User =require('../models/user');


const userPost = async  (req,res = response) => {
    saveUser("vitromex",req,res)
    
}
const userPostArko = async  (req,res = response) => {
    saveUser("arko",req,res)
}
const saveUser = async (platform, req,res = response)=>{
    const {name,email,password,lastName,country="none",city="none"} = req.body;

    const user = {
        ...req.body, 
        id: fakeUser.length + 1,
        dateUserCreated:new Date().toISOString().slice(0,10),
        platform,
        state: true
    }
    //
    // encriptadr password
    // const salt = bcryptjs.genSaltSync();
    // user.password = bcryptjs.hashSync(password,salt)
    // 
    try {
        // await user.save();       
        fakeUser.push(user)
        res.json({
            state:user.state,
            favorites:user.favorites,
            id:user.id,
            name:user.name,
            email:user.email,
            lastName:user.lastName,
            country:user.country,
            city:user.city,
            profession: user.profession
        })
    } catch (error) {
        console.log(error)
    }
}


const userGet = async(req,res=response) => {
    getUsers("vitromex", req,res)
}

const userGetArko = async(req,res=response) => {
    getUsers("arko", req,res)
}

const getUsers = async (platform,req,res=response) =>{
    // TODO: limite de 100000 usuarios esta pendiente la paginacion, fuera de alcanze? 
    const { limit = 100000,start=0 } = req.query;
    const query = {state:true,platform};
    
    // if(!Number(limit)){
    //     return res.status(400).json({
    //         ok:false,
    //         error:'el -limit y el -start tienen que ser numeros revisa tu peticion'
    //     })
    // }
    // if(!Number(start)){
    //     return res.status(400).json({
    //         ok:false,
    //         error:'el -limit y el -start tienen que ser numeros revisa tu peticion'
    //     })
    // }

    // User.find(query)
    //     .skip(Number(start))
    //     .limit(Number(limit)),
    //     User.countDocuments(query)
    const [users,total]= await Promise.all([
        fakeUser.filter(user => {
            if (user.state && user.platform === platform) {
                return {
                    ...user
                }
            }
        }),
        fakeUser.filter(user => {
            if (user.state && user.platform === platform) {
                return {
                    ...user
                }
            }
        }).length
    ])

    res.json({
        total,
        users
    })
}


const userDelete = async(req,res = response) => {
    const {id} = req.params;
    const user = fakeUser.find(user => {return user.id === parseInt(id)})
    res.json({
        user
    })
}

const numberOfUsers = async(req,res=response)=>{
    const total = fakeUser.filter(user => {return user.state && user.platform === "vitromex"}).length
    res.json({
        total
    })
}
const numberOfUsersArko = async(req,res=response)=>{
    const total = fakeUser.filter(user => {return user.state && user.platform === "arko"}).length
    res.json({
        total
    })
}


module.exports ={
    userGet,
    userPost,
    userDelete,
    numberOfUsers,
    userPostArko,
    userGetArko,
    numberOfUsersArko
}
