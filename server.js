const fs = require('fs');
const parse = require('csv-parse');
const cors = require('cors');
const express = require('express');
const session = require('express-session');

const port = process.env.PORT || 81;
const questions = [];
const parser = parse({delimiter: '\t'}, function(err, data){
    if (err) {
        console.log("Error", err);
    }
    console.log(data);
    questions.push(data);
});

fs.createReadStream(__dirname + '/Questions.txt').pipe(parser)

const app = express();
app.use(express.json());
app.use(cors());

app.use(session({
    secret: 'qsxtfvbk,',
    resave: false,
    saveUninitialized: false,
    cookie: { path: '/', httpOnly: true, secure: true, maxAge: null },
}));

app.get('/questions', (req, res, next) => {
    res.json(questions);
    console.log('Received request for questions');
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});