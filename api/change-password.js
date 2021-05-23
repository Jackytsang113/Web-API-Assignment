
const express = require('express');
const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = 'RXD5F9uSN-Us.pKB#u?QT?wY#vGEVWf+k?Axf4Z*@#Rb5E5RYhY2f#rd5Nkqz!G5'

router.post('/api/change-password', async (req, res) => {
    const {token, newpassword: TextPassword} = req.body;

    if(!TextPassword || typeof TextPassword !== 'string'){
        return res.json({ status: 'error', error: "Invalid password"})
    }
    if(TextPassword < 6){
        return res.json({ 
            status: 'error', 
            error: "Should be atleast 6 characters"})
    }

    try{
        const user = jwt.verify(token, JWT_SECRET);
        const _id = user.id;
        const password = await bcrypt.hash(TextPassword, 10);

        await User.updateOne(
            { _id }, 
            {
                $set: { password }
            }
        );
        // console.log('JWT decoded: ', user)
        res.json({ status: 'ok'});
    } catch(error){
        console.log(error.message)
        return res.json({ status: 'error', error: ";))"})
    }
});

module.exports = router;