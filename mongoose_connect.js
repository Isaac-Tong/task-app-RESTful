const mongoose = require("mongoose");
var validator = require("validator");
require('dotenv').config()

const URL = process.env.DB_URL

mongoose.connect(URL, { useNewUrlParser: true, useCreateIndex: true });


