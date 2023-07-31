const mongoose = require("mongoose");
const validator = require("validator");
const { string } = require("yargs");

const uri = "mongodb+srv://akash:12345@task-app-cluster.7yzwku0.mongodb.net/task-manager-api";

const main = async () => {
    try {
        await mongoose.connect(uri);

        console.log("Connected to database");

        const userSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: 3
            },
            email: {
                type: String,
                validator(value){
                    if(!value.isEmail()){
                        throw new Error("Email is invalid");
                    }
                }
            },
            password: {
                type: String,
                required: true,
                trim: true,
                minlength: 6,
                maxlength:20,
                validator(value){
                    if(value.toLowerCase().includes("password")){
                        throw new Error("Password should not contain 'password'");
                    }
                }
            },  
            age: {
                type: Number,
                default: 0,
                validator(value){
                    if(value < 0){
                        throw new Error("Age must be a positive number");
                    }
                }
            }
        });

        const userModel = mongoose.model("User", userSchema);

        // const me = new userModel({ name: "akash", age: 20 });
        // const me = new userModel({ name: "              good akash    ", age: 4, email: "adfb@db.cg", password: "         876549gjk" });
        // const result = await me.save();

        const taskSchema = mongoose.Schema({
            description: {
                type: String,
                required: true,
                trim: true
            },
            completed: {
                type: Boolean,
                default: false
            }
        });

        const taskModel = mongoose.model("task", taskSchema);
        const my_task = new taskModel({
            description: "i am adding a task"
        });

        const result = await my_task.save();

        console.log(result);

        await mongoose.connection.close();
        console.log("Disconnected from database");
    }
    catch (error) {
        console.error("Error:", error);
    }
};

main();
