
const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI

async function run() {
    try {
        // Connect the client to the server
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 30000,
        });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }catch(err) {
        console.error(err);
    }
}
run().catch(console.dir);