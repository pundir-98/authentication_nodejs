const express = require('express')
const router = express.Router()
const  User= require('../models/user')



router.post('/login', (req, res) => {
    ;
     var username= req.body.username;
     var password= req.body.password;
     var role= req.body.role
     var operation= req.body.operation;
     var id  = req.body.id;
    //  if (role == "hr"){
    //     res.redirect('http://localhost:4000/courses/'+operation)
    //  }
     User.find({username: username, password: password}, function(err,user) {
         
         if(!user){
            return res.status(404).send('user not found')
            }
            if(err){
            console.log(err)
            return res.status(500).send('there is no user')
             }

             if (role == "hr"){
                 if(operation == 'create'){
                res.redirect('http://localhost:4000/courses/'+operation)
                 }
                 else if(operation == "delete"){
                    res.redirect('http://localhost:4000/courses/'+operation+'/'+id)
                 }
             }
              else if (role == "developer"){
                if(operation == 'create'){
                    res.redirect('http://localhost:4000/courses/'+operation)
                     }
                     else if(operation == "update"){
                        res.redirect('http://localhost:4000/courses/'+operation)
                     }
             }
             else if(role == "manager"){
                res.redirect('http://localhost:4000/courses/'+operation)
             }

             else{
                 res.send('enter vaid role')
             }
     })

});



router.post('/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    })
    try{
        const newuser = await user.save()
        res.status(201).json(newuser)
    }catch (err){
        res.status(400).json({'message': err.message})
    }
})



module.exports = router

  //     if(err){
    //         console.log(err)
    //         return res.status(500).send('there is no user')
    //     }
    //     if(!user){
    //         return res.status(404).send('user not found')
    //     }
    // User.findOne({username: username, password: password}, function(err,user) {

//     res.redirect('/courses')
    
//     // if(!user){
//     //     return res.status(404).send('user not found')
//     // }if(err){
//     //     console.log(err)
//     //     return res.status(500).send('there is no user')
//     // }
    
// //return res.status(200).send('login successful')