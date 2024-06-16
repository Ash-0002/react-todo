const express = require("express");
const { createTodo, updateTodo } = require("./types"); // Ensure these are correctly defined
const { todo } = require("./db"); // Ensure this has the correct methods for DB interaction
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/todo", async function (req, res) {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);
    if (!parsePayload.success) {
        res.status(400).json({
            msg: "You sent the wrong inputs",
            errors: parsePayload.error.errors,
        });
        return;
    }
    try {
        await todo.create({
            title: createPayload.title,
            description: createPayload.description,
            completed: false,
        });
        res.json({
            msg: "Todo created"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message,
        });
    }
});

app.get("/todos", async function (req, res) {
    try {
        const todos = await todo.find();
        res.json({
            todos
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message,
        });
    }
});

app.put("/completed", async function (req, res) {
    const updatePayload = req.body;
    const parsePayload = updateTodo.safeParse(updatePayload);
    if (!parsePayload.success) {
        res.status(400).json({
            msg: "You sent the wrong inputs",
            errors: parsePayload.error.errors,
        });
        return;
    }

    try {
        const result = await todo.updateOne({ _id: req.body.id }, { $set: { completed: true } });
        if (result.nModified === 0) {
            res.status(404).json({
                msg: "Todo not found"
            });
            return;
        }
        res.json({
            msg: "Todo marked as completed"
        });
    } catch (error) {
        res.status(500).json({
            msg: "Internal server error",
            error: error.message,
        });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
