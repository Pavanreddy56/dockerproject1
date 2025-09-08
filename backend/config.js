const mongoose = require("mongoose");

const uri = process.env.MONGO_URI || "mongodb://admin:password@mongo:27017/devopsdb?authSource=admin";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => console.error("❌ MongoDB connection error:", err));
