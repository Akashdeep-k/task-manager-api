const mongoose = require("mongoose");

const uri = process.env.DATABASE_URL;

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
