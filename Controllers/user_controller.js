const jwt = require('jsonwebtoken')
const axios = require('axios')
const User = require("../models/user-model")
const bcrypt = require('bcryptjs')
require('dotenv').config()



const home = async (req, res) => {
    try {
        res.status(200).send("welcome to home2 ");
    } catch (error) {
        console.log(error);
    }
}


const register = async (req, res) => {
    try {
        const { name, email, profile, password } = req.body
        if (!email || !password || !name) {
            return res.status(400).json({
                message: "somethig is missing",
                success: false
            })
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            return res.status(400).json({ Msg: "email already exists", success: false })
        }
        saltround = 10;
        const hash_password = await bcrypt.hash(password, saltround);
        // await User.deleteMany({})
        await User.create({ name, email, password: hash_password });
        res.status(201).json({
            message: "registration succesfull",
            success: true
        });

    } catch (error) {
        res.status(400).send({ Message: "page not found" })
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                msg: "somethig is missing",
                success: false
            })
        }
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return res.status(400).json({ msg: "Incorrect email", success: false })
        }

        const passwordmatch = await bcrypt.compare(password, userExist.password);
        const token = jwt.sign(
            { email: userExist.email, id: userExist._id, name: userExist.name },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TIMEOUT }
        )
        if (passwordmatch) {
            res.status(200).cookie(
                "token", token, { maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
                    message: "login succesfull",
                    userExist,
                    success: true,
                    token
                })
        } else res.status(401).json({ message: "invalid email or password " });
    } catch (error) {
        res.status(400).json({ msg: "login page not found" })
    }
}

const loginwithgoogle = async(req,res)=>{


}



const loginwithgooglecallback = async(req,res)=>{
const userdata = await req.user._json
await req.logout(()=>{
    console.log("Logout success")
})

// res.send(req.user)
// console.log(userdata)

const userExist = await User.findOne({email: userdata.email})
if(userExist){
    const token = jwt.sign(
        { email: userExist.email, id: userExist._id, name: userExist.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_TIMEOUT }
    )
   console.log("user already exist",token)
//    return res.send({token:token, success:true })
   res.redirect("http://localhost:8000/api/v1/user/success?token="+token)
}
else {  user1= await User.create({
    name:userdata.name,
    profile:userdata.picture, 
    email:userdata.email
})
console.log("user register successfuly")
const token = jwt.sign(
    { email: user1.email, id: user1._id, name: user1.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TIMEOUT }
)
// return res.send({ success:true ,token:token})
res.redirect("http://localhost:8000/api/v1/user/success?token="+token)

}

    
}









module.exports = { home, register, login, loginwithgoogle, loginwithgooglecallback }
