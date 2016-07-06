'use strict'

let express = require('express');
let exec = require('child_process').exec;
let app = express();

const existingUsers = [
  'danvalencia',
  'pjulian',
  'johndoe'
]

app.use(express.static('public'));

app.get('/search', (req, res) => {
  let query = req.query.q;
  if (typeof query !== 'undefined') {
    let cmd = "grep '^" + query + "' /usr/share/dict/words | head -n 20";
    console.log(cmd);
    exec(cmd, (error, stdout, stderr) => {
      let wordList = stdout.split('\n').filter(w => {return w !== ""});
      res.json(wordList);
    })
  }
})

app.get('/checkUser', (req, res) => {
  let user = req.query.username;

  if (typeof user !== 'undefined') {
    let foundUsers = existingUsers.filter((u) => {return u.toLowerCase() === user.toLowerCase()});
    if (foundUsers.length > 0) {
      // User exists
      console.log("User already exists!");
      res.status(409).json({msg: "User already exists"});
    } else {
      console.log("User " + user + " does not exist.");
      res.json({msg: "User does not exist"});
    }
  }


})
app.listen(3000, () => {
  console.log('Sample app listening on port 3000');
})
