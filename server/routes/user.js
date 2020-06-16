const express = require('express');
const router = express.Router();

const {auth} = require('../middleware/auth')


/// model

const {User} = require('../models/user')


router.post('/register', (req, res) =>{
    
    const user = new User(req.body)
    console.log(user)
    user.save((err, doc)=>{
        console.log(err)
        if(err) return res.json({sucess: false});
        res.status(200).json({
            sucess: true,
            user: doc
        });

    })
});

router.post('/login', (req, res) =>{
    User.findOne({'email': req.body.email}, (err, user) =>{
        if(!user) return res.json({
            auth: false,
            message: "AUTH did not work",
            userData: false
        })
            
        user.comparePassword(req.body.password, (err, isMatch)=>{
            if(!isMatch) return res.json({
                auth: false,
                message: "Wrong Password",
                userData: false

            });



            user.generateToken((err, user) =>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    auth: true,
                    userData:{
                        id: user._id,
                        email: user.email,
                        name: user.name,
                        lastname: user.lastname
                    }

                })
            })
        })
    })

});

router.get('/auth', auth, (req, res) =>{
    res.json({
        auth: true,
        userData: {
            id: req.user._id,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname

        }
    })
})


router.get('/logout', auth, (req, res) =>{
    req.user.deleteToken(req.user.token, function(err,user){
        if(err) return res.status(400).send(err);
        res.status(200).send("Goodbye");

    })
})



module.exports = router;
