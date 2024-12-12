const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const salt = bcrypt.genSaltSync(10);

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