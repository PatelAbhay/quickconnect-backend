var express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
var path = require("path");
var PORT = process.env.PORT || 3000;

var app = express();
// var otherRoutes = require("./routes/routes");

// Joining directories into one
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "views")));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));

// Logs all request information and time
app.use(morgan("tiny"));


// Database Connection with MySQL
// dbHandler.connectToDatabase();

// Routing
// app.use("/ws/", otherRoutes);

var users = [
  {
    name: 'Tirth',
    age: 20,
    email: 'tirth@somewhere.com',
    account_type: 'normal',
  },
  {
    name: 'Sami',
    age: 24,
    email: 'sami@somewhere.com',
    account_type: 'verified',    
  },
  {
    name: 'Abhay',
    age: 19,
    email: 'abhay@somewhere.com',
    account_type: 'normal',
  },
]

app.get("/", function(req, res) {
  try {
    res.send("Hello World");
  } catch(e) {
    res.send({ result: "Test Result"});
  }
});

app.get("/test", function(req, res) {
  try {
    res.send({ result: "Test Result"});
  } catch(e) {
    res.send({ result: "Test Result"});
  }
});

app.post("/users", function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("email: ", email);
  try {
    res.send({ result: "Test Result"});
  } catch(e) {
      res.send("Error C-001: ", e);
  }
});

app.get("/getUsers", function(req, res) {
  try {
    res.send({ result: users});
  } catch(e) {
    res.send({ result: "Test Result"});
  }
});

app.listen(PORT, function() {
  console.log("Server started on port " + PORT + "...");
});
// setInterval(intervalFunc, 1500);
// function intervalFunc() {
//     console.log('Timer yay!');
// }
