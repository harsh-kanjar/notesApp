const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/notesApp";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongo;


///mongoos.connect(mongoURI,() => {})   <- this method (callback) is no longer valid 