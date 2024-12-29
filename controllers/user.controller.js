const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);
require("dotenv").config();
const secrect = process.env.SECRET;

//priorlty จัดลดับความสำคัญ
//register Libary:bcrypt  Step :1.check Username,Password 
// 2.check dupicate User(obtional) 3.hook password(แปลงรหัส) 
// 4.save to DB (diagram:Activity/sequence )

exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all requires fields!",
    });
    return;
  }

  try {
    const hashesPassword = bcrypt.hashSync(password, salt);
    const user = await UserModel.create({
      username,
      password: hashesPassword,
    });
    res.send({
      message: "User Register successfuly",
      user,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while registering a new user",
    });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).send({
      message: "Please provide all requires fields!",
    });
    return;
  }
  try{
    const userDoc = await UserModel.findOne({username});
    if(!userDoc){
      res.status(404).send({
        message: "User not found",
      });
      return;
    }
    const isPasswordMatched = await bcrypt.compare(password, userDoc.password);
    if(!isPasswordMatched){
      res.status(401).send({
        message: "Invalid credentials",
      });
      return;
    }
    //login success
    jwt.sign({username, id:userDoc._id}, secrect,{}, (err, token)=>{
      if(err){
        res.status(500).send({
          message:"Internal server error: Authentication Failed!"
        });
        return;
      };   
    //token generated
    res.send({
      message:"User logged in successfully",
      id: userDoc._id,
      username,
      accessToken: token,
    });
  });
 }catch (error){
    res.status(500).send({
      message:
        error.message ||
        "Something error occurred while registering a new user",
    });
  }
}