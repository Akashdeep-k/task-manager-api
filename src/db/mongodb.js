const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://akash:12345@task-app-cluster.7yzwku0.mongodb.net/";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToMongoDB = async () => {
    try {
        const client = await MongoClient.connect(uri, options);
        console.log("Connected to database successfully");

        client.close();
    }
    catch (error) {
        console.error("An error occured - ", error);
    }
}

connectToMongoDB();