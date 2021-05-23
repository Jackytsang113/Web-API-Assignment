const express = require('express');
const Favorite = require('../model/favorite');
const router = express.Router();

router.post('/api/favorite', async (req, res) => {
    console.log(req.body);
    const {
        username,
        foodname,
        description,
        comment
    } = req.body;

    try{
        const response = await Favorite.create({
            username,
            foodname,
            description,
            comment
        });

        console.log('new Favorite: ', response)
    }catch(error){
        throw error
    }
    res.json({ status: 'ok' })
});

router.post('/api/editfavorite', async (req, res) => {
    console.log(req.body);
    const {
        id,
        comment
    } = req.body;

    const _id = id;
    try{
        await Favorite.updateOne(
            { _id }, 
            {
                $set: { comment }
            }
        );

        // console.log('updated Favorite: ', response)
    }catch(error){
        throw error
    }
    res.json({ status: 'ok' })
});

router.delete('/api/delfavorite', async (req, res) => {
    console.log(req.body);
    const {
        id,
    } = req.body;

    try{
        const response = await Favorite.findByIdAndDelete(id);

        console.log('deleted Favorite: ', response)
    }catch(error){
        throw error
    }
    res.json({ status: 'ok' })
});

module.exports = router;