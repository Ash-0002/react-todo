/* 
todo {
   title: string;
   description: string;
   completed: boolean 
}
*/

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin:admin@cluster0.abeguul.mongodb.net/");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model("ReactTodo", todoSchema);

module.exports = {
    todo
}