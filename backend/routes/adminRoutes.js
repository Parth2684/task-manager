const express = require("express");
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const z = require("zod");
const { adminModel, taskModel, employeeModel } = require("../models/db");
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
    
    try{
        const {name, email, password} = req.body;
        const credentials = accountSchema.safeParse(req.body)
        if(!credentials.success){
            return res.json({
                msg: "Invalid inputs",
                error: credentials.error
            })
        }
        const existingEmail = await adminModel.findOne({
            email
        })
        if(existingEmail){
            return res.status(403).json({
                msg: "This mail already exists"
            })
        }
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
                jwt.sign({
                    userId: newAdmin._id,
                    email
                },JWT_SECRET)
                return res.json({
                    msg: "Account created successfully",
                })
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
    assignedTo: z.array(
        z.string().email()
    ).nonempty({
        msg: "Should not be empty"
    })
}).strict()


adminRouter.post("/createTask", authMiddleware, async (req, res) => {
    const assignedFrom = req.userId;
    const {title, description, assignedTo} = req.body;
    const task = taskSchema.safeParse(req.body);
    if(!task.success) {
        return res.json({
            msg: "Please provide the task details correctly"
        })
    }
    try{
        const assignedToEmail = await employeeModel.find({
            email: {$in: assignedTo}
        },"_id")

        const idsToDb= assignedToEmail.map(assignedToEmail => assignedToEmail._id)

        const createTask = await taskModel.create({
            title,
            description,
            assignedFrom,
            assignedTo: idsToDb
        })

        const taskId = createTask._id;
        for (const employeeId of idsToDb){
            await employeeModel.findByIdAndUpdate(employeeId,
                {$push: {tasks: taskId}},
                {new: true}
            );
        }

        const addToAdmin = await adminModel.findByIdAndUpdate(assignedFrom,
            {$push: {tasks: taskId}},
            {new: true}
        )
        if(!(createTask || addToAdmin) ){
            return res.json({
                msg: "There was some error while creating task"
            })
        }else{
            return res.json({
                msg: "The task was successfully created and assigned to respective employees",
                task: createTask
            })
        }

       

    }catch(err){
        res.json({
            msg: "There was an error",
            error: err.message
        })
    } 
})


adminRouter.get("/tasks", authMiddleware, async (req, res) => {
    const adminId = req.userId;
    try{
        const admin = await adminModel.findById(adminId).populate('tasks');
        if (!admin) {
            return res.json({
                msg: "Admin not found"
            });
        }

        
        const taskList = await taskModel.find({ _id: { $in: admin.tasks } });
        
        const tasksWithEmployeeEmails = await Promise.all(taskList.map(async (task) => {
            
            const employees = await employeeModel.find({ _id: { $in: task.assignedTo } }).select('email');
            
            const taskCompletedByEmails = await employeeModel.find({_id: { $in: task.completedBy}}).select('email');    
            return {
                ...task.toObject(),
                assignedToEmail: employees.map(emp => emp.email),
                completedEmails: taskCompletedByEmails.map(employee => employee.email)
            };
        }));


        
        
        res.json({
            msg: "List of tasks",
            taskList: tasksWithEmployeeEmails
            
        })
    }catch(err){
        res.json({
            msg: "There was some error",
            error: err || err.message
        })
    }
})


adminRouter.get("/employees", authMiddleware, async (req, res) => {
    const email = req.email;
    try{
        const employeeList = await employeeModel.find({});
        res.json({
            msg: "List of Employees",
            employeeList
        })
    }catch(err){
        res.json({
            msg: "There was an error",
            error: err
        })
    }
})


const updateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    assignedTo: z.array(z.object()).optional(),
    completedBy: z.string().optional()
})

adminRouter.put("/task", authMiddleware, async (req, res) => {
    const email = req.email;
    const taskId = req.query.taskId;
    const response = req.body;
    const update = updateTaskSchema.safeParse(response);
    const updatedData = update.data
    try{
        const admin = await adminModel.findOne({
            email
        })
        const taskExist = admin.tasks.includes(taskId);
        if(!taskExist){
            return res.json({
                msg: "task does not exists"
            })
        }

        const updatedTask = await taskModel.findByIdAndUpdate(taskId,{$set: updatedData}, {new: true})
        if(!updatedTask) {
            return res.json({
                msg: "There was some error updating the task"
            })
        }
        res.json({
            msg: "task was successfully updated",
            updatedTask
        })
    }catch(err){
        res.json({
            msg: "There was an error",
            error: err
        })
    }
})


adminRouter.delete("/deleteTask", authMiddleware, async (req, res) => {
    const email = req.email;
    const taskId = req.query.taskId;
    try{
        const admin = await adminModel.findOne({
            email
        })
        const taskExist = admin.tasks.includes(taskId)
        if(!taskExist){
            return res.json({
                msg: "task does not exist"
            })
        }
        const deleteTask = await taskModel.findByIdAndDelete(taskId)
        
        if(!deleteTask){
            return res.json({
                msg: "Due to some error task could not be deleted"
            })
        }
        res.json({
            msg: "The task was deleted successfuly"
        })
    }catch(err){
        res.json({
            msg: "Some error in deleting task",
            error: err
        })
    }
})

module.exports = {
    adminRouter
}