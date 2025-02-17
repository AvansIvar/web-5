import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var app = express();

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
})

var server = app.listen(5000, function(){
    console.log("Express app running at http://127.0.0.1:5000/");
})
