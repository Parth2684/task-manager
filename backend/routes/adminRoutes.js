const express = require("express");
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const { adminModel, taskModel } = require("../models/db");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middlewares/auth")


const accountSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string()
            .min(8, "Password should atleast be of 8 characters")
            .max(100, "Password cannot be more than 100 characters")
            .regex(/[A-Z]/, "Password must contain atleast 1 uppercase")
            .regex(/[a-z]/, "Password must contain atleast 1 lowercase")
            .regex(/[0-9]/, "Password must contain atleast 1 number")
            .regex(/[\W_]/, "Password must contain atleast 1 special character")
}).strict({
    msg: "Extra Fields Not Allowed"
})


adminRouter.post("/createAdmin", async (req, res) => {
    const {name, email, password} = req.body;
    const credentials = accountSchema.safeParse(req.body)
    if(!credentials.success){
        return res.json({
            msg: "Invalid inputs",
            error: credentials.error
        })
    }
    
    try{
        const existingEmail = adminModel.findOne({
            email
        })
        if(existingEmail){
            return res.status(403).json({
                msg: "This mail already exists"
            })
        }else{
            const hashedPassword = await bcrypt.hash(password, 5);
            const newAdmin = await adminModel.create({
                name,
                email,
                password: hashedPassword
            })
            if(!newAdmin){
                return res.json({
                    msg: "Error creating the account"
                })
            }else{
                jwt.sign()
                return res.json({
                    msg: "Account created successfully"
                })
            }
        }
    }catch(err){
        res.json({
            msg: err
        })
    }
})


adminRouter.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    try{
        const adminExist = await adminModel.findOne({
            email
        })
        if(!adminExist){
            return res.json({
                msg: "Email does not exist"
            })
        }
        const correctPassword = await bcrypt.compare(password, adminExist.password)
        if(!correctPassword){
            return res.json({
                msg: "Incorrect Password"
            })
        }else{
            const token = jwt.sign({
                userId: adminExist._id,
                email
            }, JWT_SECRET)
            res.json({
                msg: "Login successfull",
                token
            })
        }
    }catch(err){
        res.json({
            msg: "Something went wrong!",
            error: err
        })
    }
})


const taskSchema = z.object({
    title: z.string(),
    description: z.string(),
    assignedTo: z.array(z.object().email())
}).strict({
    msg: "extra fields are not allowed"
})


adminRouter.post("/createTask", authMiddleware, async (req, res) => {
    const email = req.email;
    const {title, description, assignedTo} = req.body;
    const task = req.body.safeParse(taskSchema);
    if(!task) {
        return res.json({
            msg: "Please provide the task details correctly"
        })
    }
    try{
        const createTask = await taskModel.create({
            title,
            description,
            assignedFrom: email,
            assignedTo
        })
        if(!createTask){
            return res.json({
                msg: "There was some error while creating task"
            })
        }else{
            return res.json({
                msg: "The task was successfully created and assigned to respective employees"
            })
        }
    }catch(err){
        res.json({
            msg: "There was an error",
            error: err
        })
    } 
})


