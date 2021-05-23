const express = require('express');
const User = require('../model/user')
const bcrypt = require('bcrypt')
const router = express.Router();

router.post('/api/register', async (req, res) => {
    console.log(req.body);
    const {
        username, 
        fullname,
        phone,
        email,
        password  : TextPassword,
        repassword
    } = req.body;

    // Error check
    if(!username || typeof username !== 'string'){
        return res.json({ status: 'error', error: "Invalid username"})
    }

    if(!TextPassword || typeof TextPassword !== 'string'){
        return res.json({ status: 'error', error: "Invalid password"})
    }

    if(TextPassword.length < 6){
        return res.json({ 
            status: 'error', 
            error: "Should be atleast 6 characters"})
    }

    if(TextPassword != repassword){
        return res.json({ 
            status: 'error', 
            error: "Password and Retype password should be the same!"})
    }

    // password to encryption
    const password = await bcrypt.hashSync(TextPassword, 10)
    
    try{
        const response = await User.create({
            username,
            fullname,
            phone,
            email,
            password
        });
        console.log('User created successfully: ', response)
    }catch(error){
        // console.log(JSON.stringify(error))
        if(error.code === 11000){
            return res.json({ status: 'error', error: "Username already exists"})
        }
        throw error
    }
 
    res.json({ status: 'ok' })
});

module.exports = router;