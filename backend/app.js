const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const rootRouter = require('./routes/index');

// ✅ MongoDB Connection (Load before routes)
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

const app = express();

app.use(cors());
app.use(express.json());  // ✅ Ensure JSON parsing works
app.use(express.urlencoded({ extended: true }));

// ✅ Load Routes
app.use("/api/v1", rootRouter);
// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
