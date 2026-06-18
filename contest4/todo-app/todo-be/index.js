const express=require('express');
const z=require('zod');

const app=express();
app.use(express.json());

todos=[];
count=1;

const todoSchema=z.object({
    task:z.string()
})

app.get('/todos', (req, res)=>{
    if(!todos.length){
        return res.json({
            success:true,
            data:[],
            message:"No todos"
        })
    }
    res.json({
        success:true,
        data:todos,
        message:"Retrieved todos"
    })
});

app.post('/todos', (req, res)=>{
    const result=todoSchema.safeParse(req.body);

    if(!result.success){
        return res.status(401).json({
            success:false,
            data:[],
            message:"Invalid Input"
        })
    }

    const task=result.data.task;

    const todoEl={
        id:count++,
        task,
        isDone:false
    }
    todos.push(todoEl);

    res.json({
        success:true,
        data:task,
        message:"Task successfully added"
    })
});

app.put('/todos/:id', (req, res)=>{
    const todoId=req.params.id;
    const todo=todos.find(x=>x.id==todoId);
    if (!todo){
        return res.json({
            success:false,
            data:[],
            message:"Todo not found"
        })
    }
    todo.isDone=true;
    res.json({
        success:true,
        data:todo,
        message:"Task done"
    })
});

app.delete('/todos/:id', (req, res)=>{
    const todoId=req.params.id;
    todos.filter(x=>x.id!==todoId);
    res.json({
        success:true,
        data:[],
        message:"Deletion Successful"
    })
})


app.listen(3000, ()=>{
    console.log("Listening for connections")
})