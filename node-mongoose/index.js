const mongoose = require('mongoose');

const Dishes = require('./models/dishes');


const url = 'mongodb://127.0.0.1:27017/conFusion';
const connect = mongoose.connect(url);


connect.then((db) => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Vodonut',
        description: 'test'
    })
    .then((dish) =>{
        console.log(dish);
        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: 'Updated Test'}
        },{ 
            new: true 
        });
    })
    .then((dish) =>{
        console.log(dish);
        dish.comments.push({
            rating: 5,
            comment: 'I\'m getting a sinking feeling!',
            author: 'Leonardo di Carpaccio'
        });
        return dish.save();
    })
    .then((dish) =>{
        console.log(dish);
        return Dishes.deleteMany({});
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch((err) =>{
        console.log(err);
    })
});