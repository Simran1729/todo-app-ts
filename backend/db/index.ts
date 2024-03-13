import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const todoScehma = new mongoose.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});

export const User = mongoose.model('User', userSchema);
export const Todo = mongoose.model('Todo', todoScehma);


//another way to do the exports
// export default {
//     User,
//     Todo
// }