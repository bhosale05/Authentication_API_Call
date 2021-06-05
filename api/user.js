const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


const userSchema = mongoose.Schema({
    FirstName : {
        type : String
    },
    LastName : {
        type : String
    },
    Email : {
        type : String
    },
    Password : {
        type : String
    }
})

let user = mongoose.model('user', userSchema);

function validator(data, res){
    let error = null;
    if(typeof data.FirstName != 'string' ){
        error = `FirstName is not String`;
        break
    } else if(typeof data.LastName != 'string'){
        error = `LastName is not String`;
        break
    } else if(typeof data.Email != 'string'){
        error = `Email is invalide`;
        break
    } else if(typeof data.Password != 'sring'){
        error = `Password is not string`;
    }

    if(error){
        return { error : error};
    } else {
        return { data : data};
    }

    return error;
}

router.post('/register', (req, res) => {
    let userData = req.body;
    userData = validator(userData, res); 
    if(userData.error){
        res.status(400).json({ error : userData.error});
        return;
    } else {
        userData = userData.data;
    }

    user.collection.insertOne(userData, (err, result) => {
        if(err) {
            console.log(err);
            res.status(400).json({error : err})
        } else{
            console.log(`Registration Done for ${JSON.stringify(userData)}`)
            res.status(200).json({success : `Registration Done for ${JSON.stringify(userData)}`})
        }
    })
})


router.post('/login', (req, res) => {
    let {Email, Password} = req.body;
    if(Email && Password){
        user.findOne({Email:Email, Password : Password },  (err, result) => {
            if(err) {
                console.log(err);
                res.status(400).json({error : err})
            } else{
                console.log(`login Successfully`)
                res.status(200).json({success : `login Successfully`})
            }
        })
    } else{
        console.error(`Enter Username and Password`);
        res.status(500).json({ error: `Enter Username and Password` });
    }
})

router.get("/logout", (req, res) => {
    user.findByIdAndRemove(req.body._id, (err, res) => {
        if(err){
            console.log(err);
            res.status(400).json({ error : err});
        } else{
            console.log(`user logout successfully`);
            res.status(200).json({ success : `user logout successfully`})
        }
    })
});

module.exports = router;
