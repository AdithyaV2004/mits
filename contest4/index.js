const express=require('express')
const z=require("zod");
const app=express()
app.use(express.json())

const user=[]

const userSignupSchema=z.object({
    email:z.email(),
    password:z.string().min(4).max(15),
    complete:z.boolean()
})

app.post("/users", function(req, res){
    const result=userSignupSchema.safeParse(req.body)
    
    if (!result.success){
        res.status(401).json({
            success:false,
            data:"Invalid input"
        })
    }else{
        res.json({
        success: true,
        data: "User login success"
        })
    }
    
})

app.listen(3000, ()=>{
    console.log("App listening on port")
})