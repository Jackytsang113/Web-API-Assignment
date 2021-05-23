
const express = require('express');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'RXD5F9uSN-Us.pKB#u?QT?wY#vGEVWf+k?Axf4Z*@#Rb5E5RYhY2f#rd5Nkqz!G5'

router.post('/api/login', async (req, res) => {
    var sess = req.session;
    const {username, password} = req.body;

    const user = await User.findOne({username}).lean();
    console.log(user);

    if(!user){
        return res.json({ status: 'error', error: "Invalid username and password"})
    }

    //the username, passsword combination is successful
    if(await bcrypt.compare(password, user.password)){
        const token = jwt.sign({ 
            id: user._id, 
            username: user.username 
        }, JWT_SECRET);

        req.session.islogin = "true";
        req.session.loginUser = user.username;
        return res.json({ status: 'ok', data: token});
    }

    res.json({ status: 'error', error: "Invalid username and password"})
});

router.get('/api/logout', async (req, res) => {
    req.session.destroy();
    return res.json({ status: 'ok'});;
});

module.exports = router;
