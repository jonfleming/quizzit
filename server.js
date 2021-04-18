const fs = require('fs');
const parse = require('csv-parse');
const cors = require('cors');
const express = require('express');
const session = require('express-session');
const serveStatic = require("serve-static")
const path = require('path');

const port = process.env.PORT || 82;
const questions = [];
const parser = parse({delimiter: '\t'}, function(err, data){
    if (err) {
        console.log("Error", err);
    }
    console.log(data);
    questions.push(data);
});
const corsOptions = {
    origin: ['https://jonfleming.net', 'https://quiz.jonfleming.net', 'http://localhost:82'],
    optionsSuccessStatus: 200,
};

fs.createReadStream(path.join(__dirname, 'Questions.txt')).pipe(parser);

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

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

app.use(serveStatic(path.join(__dirname, 'client', 'dist')));
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});