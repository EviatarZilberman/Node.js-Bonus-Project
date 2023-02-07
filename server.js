const express = require("express"); // server library
const mongoose = require("mongoose"); // mongoose
const legos = require("./routers/legoroutes"); // import the router

const app = express();
const PORT = 3000;

app.use(express.static("public"));

// middleware - connect between the server to the client.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use the router for legos:
app.use("/legos", legos);

// Connect to MongoDB using mongoose - to Stock database.
mongoose.connect(
  'mongodb+srv://EviatarDB2:cisco123@cluster0.0zqp1ne.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(PORT, () => console.log(`Listening in port ${PORT}`));

