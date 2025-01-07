// signup , signin , add new courses , see all courses
const express = require("express");
const router = express.Router();

const AdminAuthenticator = require("../middlewares/admin");
const {Admin , Course} = require("../db/index");

const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../publickey");


router.post("/signup" , async (req,res)=>{

    const username = req.body.username; 
    const password = req.body.password;

    console.log(username)

    await Admin.create({
        username : username , 
        password : password
    })

    res.json({
        msg : "Admin has been added"
    })
})

router.post("/signin" , async (req,res)=>{

    const username = req.body.username;
    const password = req.body.password;

    const response = await Admin.findOne({username : username , password : password});

    console.log( response);
    if(response){
        const token = jwt.sign({username : username} , JWT_SECRET);
        res.status(200).json({
            msg : "Admin has been Authenticated.",
            token : token
        })
    }else{
        res.status(403).json({
            msg : "Either username or password is incorrect."
        })
    }



})


router.post("/addCourses" , AdminAuthenticator , async (req,res)=>{

    const username = req.username;
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;

    const value = await Admin.findOne({username : username});

    if(value){

        await Course.create({
            title , description , price
        })

        res.status(200).json({
            msg : "Course has been created successfully."
        })

    }
    else{  
        res.status(403).json({
            msg : "User is not Authorized to add new Course."
        })

    }


})

router.get("/courses" , AdminAuthenticator , async (req,res)=>{

    const response = await Course.find({});

    res.json({
        response : response
    })

})


module.exports = router;