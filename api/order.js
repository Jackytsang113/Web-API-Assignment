const express = require('express');
const Order = require('../model/order');
const router = express.Router();

router.post('/api/order', async (req, res) => {
    console.log(req.body);
    const {
        username, 
        foodname,
        price
    } = req.body;

    try{
        const response = await Order.create({
            username,
            foodname,
            price
        });

        console.log('new Order: ', response)
    }catch(error){
        throw error
    }
    res.json({ status: 'ok' })
});

router.delete('/api/delorder', async (req, res) => {
    console.log(req.body);
    const {
        id,
    } = req.body;

    try{
        const response = await Order.findByIdAndDelete(id);

        console.log('deleted Order: ', response)
    }catch(error){
        throw error
    }
    res.json({ status: 'ok' })
});

module.exports = router;
