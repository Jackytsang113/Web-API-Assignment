const mongoose = require('mongoose');

const uri = "mongodb+srv://jacky:jacky@cluster0.sjspr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDB = async() => {
    mongoose.connect(uri,{ 
        useUnifiedTopology: true, 
        useNewUrlParser: true ,
        useCreateIndex: true
    });
    console.log('db connected..!');
}

module.exports = connectDB;