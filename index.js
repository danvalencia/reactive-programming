'use strict'

let express = require('express');
let exec = require('child_process').exec;
let app = express();

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

app.listen(3000, () => {
  console.log('Sample app listening on port 3000');
})
