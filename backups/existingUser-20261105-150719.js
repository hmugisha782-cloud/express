import User from "../models/user.js"

async function usereExist (req,res,next){

        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist"

            })
        }


        return
    }


export default usereExist