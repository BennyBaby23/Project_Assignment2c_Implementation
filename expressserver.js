const express = require("express");

const app = express();

app.use((res,req, next) => {
    console.log(req.url);

    next();
});

app.use('/helloworld', (res,req, next) => {
   res.status(200).send("HelloWorld");
    
});
app.use('/goodnight', (res,req, next) => {
    res.status(200).json("jason file");
     
 });

 app.use((res,req) => {
    res.status(400).send('notfound');
     
 });
 app.listen(3000);
 console.log('web app ');