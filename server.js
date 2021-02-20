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

// new post
//  user id
//  user name
//  post content

var post_count = 0;
var user_count = 0;
var comment_count = 0;

var posts = [
  {
    id: '',
    user_name: 'Sami',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    num_likes: 0,
    comments: [
      {
        id: '',
        from_id: '',
        from_name: '',
        content: '',
      }
    ],
  },
  {
    id: '',
    user_name: 'Sami',
    text: 'Sometimes Ill start a sentance and I dont even know where its going.',
    num_likes: 4,
    comments: [
      {
        id: '',
        from_id: '',
        from_name: '',
        content: '',
      }
    ],
  },
  {
    id: '',
    user_name: 'Sami',
    text: 'I. DECLARE. BANKRUPTCY.',
    num_likes: 12,
    comments: [
      {
        id: '',
        from_id: '',
        from_name: '',
        content: '',
      }
    ],
  },
  {
    id: '',
    user_name: 'Sami',
    text: 'Occasionally, Ill hit somebody with my car, so sue me',
    num_likes: 78,
    comments: [
      {
        id: '',
        from_id: '',
        from_name: '',
        content: '',
      }
    ],
  },
  {
    id: '',
    user_name: 'Sami',
    text: 'I am running away from my responsibilites, and it feels good',
    num_likes: 46,
    comments: [
      {
        id: '',
        from_id: '',
        from_name: '',
        content: '',
      }
    ],
  },
]

var users = [
  {
    id: '',
    name: 'Tirth',
    email: 'tirth@somewhere.com',
    password: '',
    account_type: 'normal',
  },
  {
    id: '',
    name: 'Sami',
    email: 'sami@somewhere.com',
    password: '',
    account_type: 'service provider',    
  },
  {
    id: '',
    name: 'Abhay',
    email: 'abhay@somewhere.com',
    password: '',
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
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;
  var user_type = req.body.account_type;


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

app.get("/getPosts", function(req, res) {
  try {
    res.send({ result: posts});
  } catch(e) {
    res.send({ result: "Test Result"});
  }
});

app.get("/getServiceUsers", function(req, res) {
  try {
    var v_list = []
    for(var i = 0; i < users.length; i++){
      if(users[i].account_type === 'service provider') v_list.push(users[i])
    }
    res.send({ result: v_list});
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
