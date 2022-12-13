import User from "./model";
import * as Jwt from "jsonwebtoken";
// import * as multer from "multer";
export default class userController {
 static async register(req: any, res: any, next: any) {
    const { fullName, phone } =req.body;
      var digits = '0123456789';
      let OTP = '';
      let MOBOTP = '';
      for (let i = 0; i < 4; i++) {
        MOBOTP += digits[Math.floor(Math.random() * 10)];
      } 
    console.log(req.body);
    const checkUser = await User.findOne({ phone });
    if (!checkUser) {
      try {
       
        const data = {
        
          fullName: fullName,
        phone: phone,
        OTP:MOBOTP
        };
     
        const save = await new User(data).save();
        return {save,data} &&
        res.status(200).json({
          message: "REGISTRATION SUCCESSFULL",
          Status_code: 200,
          data: data,
        });
      } catch (error) {
        console.log(error);
        return res.json({
          message: "REGISTRATION FAILED",
        });
      }
    } else {
      res.send({ message: "User Already exists with same email you entered" });
    }
  }

  static async login(req:any, res:any) {
    try {
      let user = await User.findOne({ phone: req.body.phone });
      let secret:any= process.env.SECRET_KEY
      if (user) {
        let result = await (req.body.OTP == user.OTP);
        if (!result) {
          console.log(" not a valid otp ");
          return res.status(401).json({
            msg: "OTP matching fail",
          });
        } else {
          const token = Jwt.sign(
            {
              email: user.phone,
              _id: user._id,
             
            },
           secret
          );
          console.log(token);

          return res.json({
            message: "LOGIN SUCCESS",
            Token: token,
          });
        }
      } else {
        return res.status(401).json({
          msg: "email not matched",
        });
      }
    } catch (error) {
      return res.json({
        message: "LOGIN FAILED",
      });
    }
  }

 
}
