
const express = require('express');
const User = require('../model/user')
const router = express.Router();

router.post('/api/editprofile', async (req, res) => {
    const {
        id, 
        fullname,
        email,
        phone
    } = req.body;

    try{
        const _id = id;

        await User.updateOne(
            { _id }, 
            {
                $set: { fullname, email, phone }
            }
        );
        res.json({ status: 'ok'});
    } catch(error){
        console.log(error.message)
        return res.json({ status: 'error', error: ";))"})
    }
});

module.exports = router;