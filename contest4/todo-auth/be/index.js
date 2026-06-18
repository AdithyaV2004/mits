const express=require('express');
const z=require('zod');
const jwt=require('jsonwebtoken');

const app=express();

app.use(express.json())

users=[];
todo=[];
count=1;

const userSignUpSchema=z.object({
    username:z.string(),
    password:z.string().min(5).max(15)
})

const todoSchema=z.object({
    task:z.string()
})

app.post('/signup', (req, res)=>{
    const result=userSignUpSchema.safeParse(req.body);

    if(result.success){
        res.status(401).json({
            success:false,
            data:[],
            message:"Invalid Credentials bitchhhhhhhhhhh....."
        })
    }
})

app.listen(3000);