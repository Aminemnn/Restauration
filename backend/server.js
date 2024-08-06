const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./model/Restaurant');
const restaurantRoutes = require('./routes/restaurantRoutes');
const bodyParser = require('body-parser');


const app = express();
const port = 3000;
app.use(bodyParser.json());


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  mongoose.connect('mongodb://localhost:27017/Restaurant')
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

  app.use(cors());

  app.use('/api/restaurant',restaurantRoutes);


