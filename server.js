const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./DB/Connection');
const http = require('html');
const fs = require('fs');
const app = express();
const ejs = require('ejs');
const User = require('./model/user');
const Food = require('./model/food');
const Order = require('./model/order');
const Favorite = require('./model/favorite');
const session = require('express-session');
var FileStore = require('session-file-store')(session);
const identityKey = 'skey';

app.set('view engine', 'ejs');
connectDB();
// app.use(express.json({ extended: false }))
// app.use('/', express.static(path.join(__dirname, 'static')));
app.use(session({
  name: identityKey,
  secret: 'secretKey', // 用來對session id相關的cookie進行簽名
  saveUninitialized: false, // 是否自動儲存未初始化的會話，建議false
  resave: false, // 是否每次都重新儲存會話，建議false
  cookie: {
  maxAge: 30 * 60 * 1000 // 有效期，單位是毫秒
  }
}));

app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'));
app.use('/img', express.static(__dirname + 'static/img'));
app.use('/js', express.static(__dirname + 'static/js'));
app.use(bodyParser.json());
app.use('/', require('./api/register'));
app.use('/', require('./api/login'));
app.use('/', require('./api/change-password'));
app.use('/', require('./api/addfood'));
app.use('/', require('./api/order'));
app.use('/', require('./api/favorite'));
app.use('/', require('./api/editprofile'));

app.use(function(req, res, next) {
  res.locals.loginToken = req.session.loginToken;
  next();
});

app.get("/", (req, res) => {
    // res.sendFile(__dirname + '/static/index.html')
    if(req.session.islogin !="true"){
      Food.find({}, function(err, foods){
        res.render('index', {
          foodList: foods
        });
      })
    }else{
      Food.find({}, function(err, foods){
        res.render('shop', {
          foodList: foods,
          userName: req.session.loginUser,
          islogin: req.session.islogin
        });
      })
    }
});

app.get("/login", (req, res) => {
    res.render('login')
});

app.get("/shop", (req, res) => {
  if(req.session.islogin=="true"){
    Food.find({}, function(err, foods){
      res.render('shop', {
        foodList: foods,
        userName: req.session.loginUser,
        islogin: req.session.islogin
      });
    })
  }else{
    res.render('login');
  }
});

app.get("/order", (req, res) => {
  const username = req.session.loginUser;
  if(req.session.islogin=="true"){
    Order.find({username}, function(err, order){
      res.render('order', {
        orderList: order,
        userName: req.session.loginUser,
        islogin: req.session.islogin
      });
    })
  }else{
    res.render('login');
  }
});

app.get("/favorite", (req, res) => {
  const username = req.session.loginUser;
  if(req.session.islogin=="true"){
    Favorite.find({username}, function(err, favorite){
      res.render('favorite', {
        favoriteList: favorite,
        userName: req.session.loginUser,
        islogin: req.session.islogin
      });
    })
  }else{
    res.render('login');
  }
});

app.get("/profile", (req, res) => {
  const username = req.session.loginUser;
  if(req.session.islogin=="true"){
    User.find({username}, function(err, user){
      res.render('profile', {
        userList: user,
        userName: req.session.loginUser,
        islogin: req.session.islogin
      });
    })
  }else{
    res.render('login');
  }
});



const Port = process.env.Prot || 3000;
app.listen(Port, () => 
    console.log('Server Started : http://localhost:3000/'
));