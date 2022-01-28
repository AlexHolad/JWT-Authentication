require("dotenv").config();

//PASO 2: Importar los paquetes que hemos instalado
const express = require("express");
// const path = require("path");

const mongoose = require('mongoose');

const auth = require("./middleware/auth");

//Use the .connect() method to connect to mongo atlas. Remember to use username and password
mongoose
   .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@authentication-cluster.psru9.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
   )
   .then((result) => console.log('Connected to MONGO ATLAS'))
   .catch((err) => console.log(err));



const PORT = process.env.PORT || 5000;

const app = express();

// Middleware Setup
// app.use(express.static(path.join(__dirname, "build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// ROUTES
app.use('/api/users', require('./routes/users.routes'));
app.post("/welcome", auth, (req, res) => {
   res.status(200).send("Welcome 🙌 ");
 });

//Middleware for build folder
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, "build", "index.html"));
// });

// APP LISTENER
app.listen(PORT, () => {
  console.log(`Connected to ${PORT}`);
});
