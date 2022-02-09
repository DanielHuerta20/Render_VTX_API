const {response } = require('express') ;
const bcryptjs = require('bcryptjs');
const { fakeUser } = require('../database/fakeDatabase');
// const User =require('../models/user');



const saveUser = async (req,res = response)=>{
    const {name,email,password,lastName,country="none",city="none"} = req.body;

    const user = {
        ...req.body, 
        id: fakeUser.length + 1,
        dateUserCreated:new Date().toISOString().slice(0,10),
        state: true
    }
    //
    // encriptadr password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

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
            profession: user.profession,
            password: user.password
        })
    } catch (error) {
        console.log(error)
    }
}

const getUsers = async (req,res=response) =>{
    // TODO: limite de 100000 usuarios esta pendiente la paginacion, fuera de alcanze? 
    const { limit = 100000, start=0 } = req.query;
    const query = {state:true };
    
    const [users,total]= await Promise.all([
        fakeUser.filter(user => {
            if (user.state) {
                return {
                    ...user
                }
            }
        }),
        fakeUser.filter(user => {
            if (user.state) {
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


module.exports ={
    userDelete,
    saveUser,
    getUsers
}
