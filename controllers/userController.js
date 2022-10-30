const models= require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
  //User SignUp
  create: async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password || !req.body.email || !req.body.contact || !req.body.address) {
      return res
        .status(400)
        .send({ message: 'All fields required' })
    }
    try{
    //Check If User Already Exists in Our Db
    const existingUser = await models.User.findOne({where:{email: req.body.email}})
    console.log({existingUser});
    if(existingUser)
    {
        return res.status(409).json({message:"User already exist, Please login"})
    }

    //Create User
    const result=await models.User.create({
      name: req.body.name,
      email:req.body.email,
      password:req.body.password,
      contact:req.body.contact,
      address:req.body.address
       
    })

    //Generate Token -- Authentication and Authorization to be Implemented
    const token = jwt.sign({email:result.email,id :result.id},process.env.SECRET_KEY)
    return res.status(201).json({ message: 'User created',user:result,token:token })
    }
    catch(error){
        console.log(error);
    }
  },

  //User Sign In
  signIn: async(req,res) =>{

    const {email, password} = req.body;
    try{
    const existingUser = await models.User.findOne({where:{email: email}})
    console.log({existingUser})

    //Check If User Exist or Not
    if(!existingUser)
    {
        return res.status(400).json({message:"User Not exists"})
    }



    if(password!==existingUser.password){
        return res.status(400).json({message:"Incorrect Password"})

    }

    const token = jwt.sign({email:email,id :existingUser.id},process.env.SECRET_KEY)
    return res.status(201).json({ user:existingUser,token:token })
    }
    catch(error){
        console.log(error);
    }
  },

  //Get All the Users's List
  findAll: async (req, res) => {
    return res.status(200).json(await models.User.findAll())
  }


}