const mongoose = require("mongoose");

const uri = "mongodb+srv://akash:12345@task-app-cluster.7yzwku0.mongodb.net/task-manager-api";

const main = async () => {
    try {
        await mongoose.connect(uri);

        console.log("Connected to database");

        const userSchema = new mongoose.Schema({
            name: {
                type: String
            },
            age: {
                type: Number
            }
        });

        const userModel = mongoose.model("User", userSchema);

        const me = new userModel({ name: "akash", age: 20 });
        const result = await me.save();

        console.log(result);

        await mongoose.connection.close();
        console.log("Disconnected from database");
    }
    catch (error) {
        console.error("Error:", error);
    }
};

main();
