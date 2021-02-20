var express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
var path = require("path");
var PORT = process.env.PORT || 3000;
var cors = require("cors");
const sqlite3 = require('sqlite3').verbose();


var app = express();
// const http = require("http").Server(app);
// const socketIO = require("socket.io")(http);
// var otherRoutes = require("./routes/routes");

// socketIO.on('connection', s => {
//   console.error('socket.io connection');
//   socket.on("pingServer", () => {
//     console.log("Hererahsd ajshdg ajshgd jahsd");
//     socketIO.sockets.emit("get_data", "GOT IT");
//   });
// });

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(cors());

// Logs all request information and time
app.use(morgan("tiny"));

let db = new sqlite3.Database('./db/database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to db.');
});

db.serialize(function() {
  db.run("CREATE TABLE user (id INT, user STRING)");

  var stmt = db.prepare("INSERT INTO user VALUES (?,?)");
  for (var i = 0; i < 10; i++) {
    stmt.run(i, "Bob");
  }
  stmt.finalize();
  db.each("SELECT id, dt FROM user", function(err, row) {
    console.log("User id : " + row.id, row.user);
  });
});

var post_count = 5;
var user_count = 3;
var comment_count = 5;

var posts = [
  {
    id: 0,
    user_name: 'Sami',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    num_likes: 0,
    comments: [
      {
        from_id: '',
        from_name: 'Agent K',
        content: 'What do you mean?',
      }
    ],
  },
  {
    id: 1,
    user_name: 'Sami',
    text: 'Sometimes Ill start a sentance and I dont even know where its going.',
    num_likes: 4,
    comments: [
      {
        from_id: '',
        from_name: 'Dummy User',
        content: 'Sounds confusing',
      }
    ],
  },
  {
    id: 2,
    user_name: 'Sami',
    text: 'I. DECLARE. BANKRUPTCY.',
    num_likes: 12,
    comments: [
      {
        from_id: '',
        from_name: 'Agent K',
        content: 'Good for you',
      }
    ],
  },
  {
    id: 3,
    user_name: 'Sami',
    text: 'Occasionally, Ill hit somebody with my car, so sue me',
    num_likes: 78,
    comments: [
      {
        from_id: '',
        from_name: 'Agent K',
        content: 'Good for you',
      }
    ],
  },
  {
    id: 4,
    user_name: 'Sami',
    text: 'I am running away from my responsibilites, and it feels good',
    num_likes: 46,
    comments: [
      {
        from_id: '',
        from_name: 'Agent K',
        content: 'That sucks!',
      },
      {
        from_id: '',
        from_name: 'Lone Wolf',
        content: 'Growing up I see. But in life you will need to learn to take responsiblities otherwise you will always be dependent on other and it is not good.',
      }
    ],
  },
]

var users = [
  {
    id: 0,
    name: 'Tirth',
    email: 'tirth@somewhere.com',
    password: '',
    account_type: 'normal',
  },
  {
    id: 1,
    name: 'Sami',
    email: 'jabz@gmail.com',
    password: 'samisami',
    account_type: 'regular',    
  },
  {
    id: 2,
    name: 'Abhay',
    email: 'abhay@somewhere.com',
    password: '',
    account_type: 'normal',
  },
  {
    account_type: "regular",
    email: "sami@gmail.com",
    id: 3,
    name: "Jabz",
    password: "samisami"
  },
  {
    account_type: "regular",
    email: "john@gmail.com",
    id: 4,
    name: "John",
    password: "samisami"
  }
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
  console.log("entered!!!");
  try {
    let totalUsers = users.length;
    console.log("totalUsers: ", totalUsers);
    var new_obj = {
      id: totalUsers,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      account_type: req.body.account_type
    };
    for(var i = 0; i < users.length; i++){
      if(email == users[i].email){
        new_obj = null;
        break;
      }
    }
    console.log("totalUsers 1: ");
    if(new_obj != null) {
      console.log("totalUsers 2: ");
      users.push(new_obj);
      res.send({ result: "SUCCESS"});
    }
    else {
      console.log("Already exists")
      res.send({ error: "Already exists"});
    }
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

app.get("/posts", function(req, res) {
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

// app.listen(PORT, function() {
//   console.log("Server started on port " + PORT + "...");
// });
var messages = [
  {
    from_id: 1,
    from: "Sami",
    to_id: 3,
    to: "Jazz",
    message: "Hi",
  },
  {
    from_id: 1,
    from: "Sami",
    to_id: 3,
    to: "Jazz",
    message: "How are you?",
  },
  {
    from_id: 3,
    from: "Jazz",
    to_id: 1,
    to: "Sami",
    message: "I am great!!",
  },
  {
    from_id: 1,
    from: "Sami",
    to_id: 3,
    to: "Jazz",
    message: "Awesome!",
  },
  {
    from_id: 3,
    from: "Jazz",
    to_id: 1,
    to: "Sami",
    message: "Thanks ...",
  }
];
const mainServer = app.listen(PORT, function() {
  console.log('server running on port ', PORT);
});

const io = require('socket.io')(mainServer, {
  cors: {
    origin: '*',
  }
});
io.on('connection', function(socket) {
    console.log(socket.id)
    socket.on('SEND_MESSAGE', function(data) {
      console.log("WOWOWOWOWOOWO: ", data);
      messages.push(data);
      io.emit('MESSAGE', data);
  });
});

app.get("/getConnectedUsers/:id", function(req, res) {
  try {
    let userId = req.params.id;
    let otherUserIds = [];
    messages.forEach(element => {
      if(element.from_id == userId) {
        otherUserIds.push({
          id: element.to_id,
          name: element.to
        });
      } else if(element.to_id == userId) {
        otherUserIds.push({
          id: element.from_id,
          name: element.from
        });
      }
    });
    const result = [];
    const map = new Map();
    for (const item of otherUserIds) {
        if(!map.has(item.id)){
            map.set(item.id, true);    // set any value to Map
            result.push({
                id: item.id,
                name: item.name
            });
        }
    }
    res.send({ result: result});
  } catch(e) {
    res.send({ error: e});
  }
});
app.get("/getMessages/:from_id/:to_id", function(req, res) {
  try {
    let fromId = req.params.from_id;
    let toId = req.params.to_id;
    console.log(fromId);
    console.log(toId);
    let allMessages = [];
    messages.forEach(element => {
      if(element.from_id == fromId && element.to_id == toId) {
        allMessages.push(element);
      } else if(element.from_id == toId && element.to_id == fromId) {
        allMessages.push(element);
      }
    });
    res.send({ result: allMessages});
  } catch(e) {
    res.send({ error: e});
  }
});
app.get("/signin/:email/:password", function(req, res) {
  let email = req.params.email;
  let password = req.params.password; 
  let userInfo = {};
  try {
    users.forEach(element => {
      if(element.email == email && element.password == password) {
        userInfo = element;
        return;
      }
    });
    res.send({ result: userInfo});
  } catch(e) {
    res.send({ error: e});
  }
});
app.post("/register", function(req, res) {
  console.log("entered!!!");
  try {
    let totalUsers = users.length;
    console.log("totalUsers: ", totalUsers);
    var new_obj = {
      id: totalUsers,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      account_type: req.body.account_type
    };
    users.push(new_obj);
    res.send({ result: "SUCCESS"});
  } catch(e) {
      res.send("Error C-001: ", e);
  }
});
app.post("/posts", function(req, res) {
  try {
    posts.unshift(req.body);
    res.send({ result: posts});
  } catch(e) {
    res.send({ result: "Test Result"});
  }
});
app.post("/postLike", function(req, res) {
  try {
    posts.forEach(element => {
      if(element.id == req.body.id) {
        element.num_likes += 1;
      }
    });
    res.send({ result: posts});
  } catch(e) {
    res.send({ result: "Test Result"});
  }
});
app.post("/postComment", function(req, res) {
  try {
    posts.forEach(element => {
      if(element.id == req.body.id) {
        element.comments.unshift({
          from_id: req.body.from_id,
          from_name: req.body.from_name,
          content: req.body.content,
        });
      }
    });
    res.send({ result: posts});
  } catch(e) {
    res.send({ result: "Test Result"});
  }
});