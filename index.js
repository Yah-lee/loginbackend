const express = require("express");
const app = express();
const port = 4000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./routes/user.routes");

// Use routes
app.use("/user", userRoutes);

app.listen(port, () => { 
  console.log(`Server running on port ${port}`);
});
