const mongoose = require("mongoose");

const uri = "mongodb+srv://akash:12345@task-app-cluster.7yzwku0.mongodb.net/task-manager-api";

const main = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to database");
    }
    catch (error) {
        console.error("Error:", error);
    }
};

main();
