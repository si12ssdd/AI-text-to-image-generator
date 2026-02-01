import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log("Database Connected");
    })

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/ai-image`)
    } catch (error) {
        console.error("Database connection error details:", error);
    }

}

export default connectDB;