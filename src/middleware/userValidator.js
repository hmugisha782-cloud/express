import {body, validationResult} from 'express-validator';

export const userValidations=[
    body("fullName").notEmpty().withMessage("Full name is required"),
    body("phone").isLength({min:10, max:13}).withMessage("phone numbr should be btn 10 and 13 characters"),
    body("email").trim().isEmail().withMessage("Please provide valid email").normalizeEmail(),
    body("password").notEmpty().withMessage("password is required")
    .isStrongPassword({
        minUppercase:1,
        minSymbols:1
    }).withMessage("Password should be strong with at least 1 uppercase and 1 symbol"),
]

export const validateUser=(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors.array().map(err=>err.msg), "errors to be displayed")
        return res.status(400).json({
            success:false,
            errors:errors.array().map(err=>err.msg)
        })
    }
    next()
}
