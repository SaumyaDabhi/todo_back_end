import express from 'express';
import cors from "cors";
const PORT = process.env.PORT || 3000;

const app =  express();

const corsOptions ={
    origin:'https://todo-front-end-rho.vercel.app/', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

let faketodos = [];

app.use(express.json());

app.get('/todos', (req, res) => {
    res.json(faketodos);
});

app.post('/todos',(req,res) => {
    const { text } = req.body;
    if(text){
        const newTodo = {
            id: Date.now(),
            createdAt: Date.now(),
            text: text,
            isCompleted: false
        }
        faketodos.push(newTodo);
        res.status(200).json(newTodo)
    }
    else{
        res.status(400).json({message:'Request body should have a text property'});
    }
})

app.delete('/todos/:id', (req,res) => {
    const removetodo = faketodos.find(todo => todo.id === Number(req.params.id));
    faketodos =  faketodos.filter(todo => todo.id !== Number(req.params.id));
    res.status(200).json(removetodo);
})

app.post('/todos/:id/completed', (req, res) => {
    const { id } = req.params;
    const matchingTodo = faketodos.find(todo => todo.id === Number(id));

    const updatedTodo = {
        ...matchingTodo,
        isCompleted: true,
    }

    if (updatedTodo) {
        faketodos = faketodos.map(todo =>
            todo.id === Number(id)
                ? updatedTodo
                : todo);
        res.status(200).json(updatedTodo);
    } else {
        res.status(400).json({ message: 'There is no todo with that id' });
    }
})

app.listen(PORT, ()=>{ console.log(`Listening on port ${PORT}`) });
