const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const z = require("zod");
const bcrypt = require("bcrypt");
const { employeeModel, taskModel, adminModel } = require("../models/db");   
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares/auth");
const { default: mongoose } = require("mongoose");


const signupBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
        .min(6,"Password should be 6 characteers long")
        .max(100, "Password should not be more then 100 characters")
        .regex(/[A-Z]/, "Password should contain atleast one Capital")
        .regex(/[a-z]/, "Password should contain atleast 1 small letter")
        .regex(/[0-9]/, "Password should contain atleast one number")
        .regex(/[\W_]/, "Password should contain atleast one special character")
}).strict({
    msg: "No extra fields allowed"
})

userRouter.post("/signup", async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const credentials = signupBodySchema.safeParse(req.body)
        if(!credentials.success){
            return res.json({
                msg: "Enter credentials in valid format",
                error: credentials.error
            })
        }
        const existingUser = await employeeModel.findOne({
            email
        })
        if(existingUser){
            return res.json({
                msg: "Account already exists"
            })
        }
        const isAdmin = await adminModel.findOne({
            email
        })
        if(isAdmin){
            return res.json({
                msg: "You are a Admin"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 5)
        const newUser = await employeeModel.create({
            name,
            email,
            password: hashedPassword
        })
        if(!newUser){
            return res.json({
                msg: "error creating account"
            })
        }
        const token = jwt.sign({
            userId: newUser._id,
            email
        },JWT_SECRET)
        res.json({
            msg: "Account created successfully",
            token
        })
    }catch(err){
        res.json({
            msg: "an error occured",
            error: err
        })
    }
})


userRouter.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await employeeModel.findOne({
            email
        })
        if(!user){
            return res.json({
                msg: "User does not exist"
            })
        }
        const correctPassword = await bcrypt.compare(password, user.password)
        if(!correctPassword){
            return res.json({
                msg: "Incorrect Password"
            })
        }
        const token = jwt.sign({
            email,
            userId: user._id
        }, JWT_SECRET)
        res.json({
            msg: "Successfully Logged in",
            token
        })
    }catch(err){
        res.json({
            msg: "You got an error",
            error: err
        })
    }
})

userRouter.get("/tasks", authMiddleware, async(req, res) => {
    try{
        const email = req.email;
        const user = await employeeModel.findOne({
            email
        })
        const taskId = user.tasks;

        const taskList = await taskModel.find({ _id: { $in: taskId } })  
        const taskAssignedByEmail = await Promise.all(taskList.map(async (task) => {
            const completedBy = await employeeModel.find({_id: task.taskCompletedBy}).select("email")
            const assignedFrom = await adminModel.find({_id: task.assignedFrom}).select("email")
            return {
                ...task.toObject(),
                completedByEmails: completedBy.map(emp => emp.email),
                assignedFromEmail: assignedFrom.map(admin => admin.email)
            }
        }))

        res.json({
            msg: "Following are Your tasks",
            taskList: taskAssignedByEmail
        })
    }catch(err){
        return res.json({
            msg: "We got an error",
            error: err
        })
    }
})


userRouter.put("/completeTask", authMiddleware, async (req, res) => {
    try{
        const user = req.userId
        const taskId = req.body.taskId;
        const task = await taskModel.findByIdAndUpdate(taskId,
            {$addToSet: {taskCompletedBy: user}},
            {new: true} 
        )
        if(!task){
            return res.json({
                msg: "error saving data to db"
            })
        }
        res.json({
            msg:"Task completed successfully"
        });
    }catch(err){
        res.json({
            msg: "We got an error",
            error: err
        })
    }
})


module.exports = {
    userRouter
}
