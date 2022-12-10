const connect = require('connect');

const app =connect;
function logging(req, res, next){
    console.log(req.url);
    next();
    

}
function helloWorld(req, res, next){
    res.setHeader('Content-type', 'text-plain');
    res.end('Hello world');

}
function goodnightWorld(req, res, next){
    res.setHeader('Content-type', 'text-plain');
    res.end('goodnight');

}
function NotFound(req, res, next){
    res.setHeader('Content-type', 'text-plain');
    res.end('pLEASE TRY SOMETHING ELSE');

}

app.use(logging);
app.use('/hello', helloWorld);
app.use('/goodnight', goodnightWorld);
app.use(NotFound);

app.listen(3000);
console.log('Server running');