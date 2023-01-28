const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();


const weather = require('./routers/weather');


const PORT = 3001;

app.use(bodyParser.json());
app.use(express.json());


const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

//Define weather router url
app.use('/weather', weather)

app.listen(PORT, () => {
  console.log(`listening server at http://localhost:${PORT}`);
});
