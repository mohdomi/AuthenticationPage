// signup , signin , view all course,  purchase courses , view his courses

const express = require("express");
const router = express.Router();

const  {User , Course} = require("../db/index");

const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../publickey");

const UserAuthenticator = require("../middlewares/user")



router.post("/signup" , async (req,res)=>{

    const username = req.body.username; 
    const password = req.body.password;

    await User.create({
        username , password
    })

    res.json({
        msg : "user has been created"
    })

})


router.post("/signin" , async(req,res)=>{

    const username = req.body.username; 
    const password = req.body.password;

    const value = await User.findOne({username , password});

    if(value){

        const token = jwt.sign({username : username} , JWT_SECRET);

        res.status(200).json({
            msg : "User Signed in",
            token  : token
        })

    }else{
        res.status(403).json({
            msg : "username or password is wrong"
        })
    }

})


router.get("/courses" , UserAuthenticator , async (req,res)=>{

    const value = await Course.find({});

    res.json({
        course : value
    })

})

router.post('/courses/:courseId' , UserAuthenticator , async (req,res)=>{

    const courseId = req.params.courseId;
    const username = req.username;

    await User.updateOne({username : username} , 
        {"$push" : {purchasedCourses :  courseId}}
    )

    res.status(200).json({
        msg : "Course Purchased Successfully"
    })

})

router.get("/myCourses" , UserAuthenticator , async (req,res)=>{

    const username = req.username; 

    const resolve = await User.findOne({username});

    console.log(resolve.purchasedCourses);

    const value = await Course.find({
        _id : {
            "$in" : resolve.purchasedCourses
        }
    })

    res.json({
        courses : value
    })

})


module.exports = router;