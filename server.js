const PORT = 3000
import express from "express"


const app = express()

app.get("/user",(req,res)=>{
    return res.status(200).json({message:"Hello world"})
})

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})
