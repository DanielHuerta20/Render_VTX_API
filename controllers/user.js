const {response } = require('express') ;
const bcryptjs = require('bcryptjs');
const { fakeUser } = require('../database/fakeDatabase');
const { UserModel } = require('../database/mysqlConfig');



const saveUser = async (req,res = response)=>{
    const {name,email,password,lastName,country="none",city="none"} = req.body;
    // const user = {
    //     ...req.body, 
    //     id: fakeUser.length + 1,
    //     dateUserCreated:new Date().toISOString().slice(0,10),
    //     state: true
    // }

    const user = {
        ...req.body
    }
    //
    // encriptadr password
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    try {
        // await user.save();
        const userDatabase = await UserModel.create(user)
        // fakeUser.push(user)
        res.json({            
            state:userDatabase.dataValues.state,
            favorites:userDatabase.dataValues.favorites,
            id:userDatabase.dataValues.id,
            name:userDatabase.dataValues.name,
            email:userDatabase.dataValues.email,
            lastName:userDatabase.dataValues.lastName,
            country:userDatabase.dataValues.country,
            city:userDatabase.dataValues.city,
            profession: userDatabase.dataValues.profession,
            password: userDatabase.dataValues.password
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
        UserModel.findAll(),
        UserModel.count()
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
