var express = require("express");
var morgan = require("morgan");
const bodyParser = require("body-parser");
var path = require("path");
var PORT = process.env.PORT || 3000;
var cors = require("cors");



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


// Database Connection with MySQL
// dbHandler.connectToDatabase();

// Routing
// app.use("/ws/", otherRoutes);

// new post
//  user id
//  user name
//  post content

var post_count = 5;
var user_count = 3;
var comment_count = 5;

var posts = [
  {
    id: '0',
    user_name: 'Sami',
    text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    num_likes: 0,
    comments: [
      {
        id: '0',
        from_id: '',
        from_name: '',
        content: '',
      }
    ],
  },
  {
    id: '1',
    user_name: 'Sami',
    text: 'Sometimes Ill start a sentance and I dont even know where its going.',
    num_likes: 4,
    comments: [
      {
        id: '1',
        from_id: '',
        from_name: '',
        content: '',
      }
    ],
  },
  {
    id: '2',
    user_name: 'Sami',
    text: 'I. DECLARE. BANKRUPTCY.',
    num_likes: 12,
    comments: [
      {
        id: '2',
        from_id: '',
        from_name: '',
        content: '',
      }
    ],
  },
  {
    id: '3',
    user_name: 'Sami',
    text: 'Occasionally, Ill hit somebody with my car, so sue me',
    num_likes: 78,
    comments: [
      {
        id: '3',
        from_id: '',
        from_name: '',
        content: '',
      }
    ],
  },
  {
    id: '4',
    user_name: 'Sami',
    text: 'I am running away from my responsibilites, and it feels good',
    num_likes: 46,
    comments: [
      {
        id: '4',
        from_id: '',
        from_name: '',
        content: '',
      }
    ],
  },
]

var users = [
  {
    id: '0',
    name: 'Tirth',
    email: 'tirth@somewhere.com',
    password: '',
    account_type: 'normal',
  },
  {
    id: '1',
    name: 'Sami',
    email: 'sami@somewhere.com',
    password: '',
    account_type: 'service provider',    
  },
  {
    id: '2',
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

