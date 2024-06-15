const express = require("express");
const { createTodo, updateTodo } = require("./types");
const app = express();

app.use(express.json());

app.post("/todo", function(req, res) {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if(!parsePayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in mongodb
})

app.get("/todos", function(req, res) {

})

app.put("/completed", function(req, res) {
    const updateTodo = req.body;
    const parsePayload = updateTodo.safeParse(updateTodo);
})