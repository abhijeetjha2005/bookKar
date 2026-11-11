const express = require("express");
const cors=require("cors")

const app = express();

// import routes
const authRoutes =require("./routes/auth.routes")
// middleware
app.use(cors());
app.use(express.json());
// routes
app.get('/',(req,res)=>{
  res.json({ message: 'API is running' })
})
// routes caall
app.use("/api/auth",authRoutes);
// error handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;
