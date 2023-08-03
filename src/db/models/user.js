const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
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
        validate(value){
            if(value.toLowerCase().includes("password")){
                throw new Error("Password should not contain 'password'");
            }
        }
    },  
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error("Age must be a positive number");
            }
        }
    }
});

userSchema.pre('save', async function(){

})

const User = mongoose.model("User", userSchema);

module.exports = User;