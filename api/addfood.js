const express = require('express');
const Food = require('../model/food');
const router = express.Router();

router.get('/api/addfood', async (req, res) => {
   console.log(req.query);

   const {
        foodname, 
        description,
        price,
    } = req.query;

    try{
        const response = await Food.create({
            foodname,
            description,
            price
        });
        console.log('Add Food: ', response)
    }catch(error){
        if(error.code === 11000){
            return res.json({ status: 'error', error: "foodname already exists"})
        }
        throw error
    }
 
    res.json({ status: 'ok' })
});

module.exports = router;