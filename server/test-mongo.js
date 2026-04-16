import mongoose from 'mongoose';
const uri = 'mongodb+srv://hydrasiddhu213_db_user:S3qTPvfoT05bOKax@cluster0.rngaibk.mongodb.net/?appName=Cluster0';
mongoose.connect(uri).then(() => {
    console.log("Connected successfully!");
    process.exit(0);
}).catch(err => {
    console.error("Connection failed:", err.message);
    process.exit(1);
});
