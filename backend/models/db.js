const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
})

const employeeSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
})

const taskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    assignedFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    assignedTo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }],
    taskCompletedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }] 
})

const adminModel= mongoose.model('Admin', adminSchema)
const employeeModel = mongoose.model('Employee', employeeSchema)
const taskModel = mongoose.model('Task', taskSchema)

module.exports= {
    adminModel,
    employeeModel,
    taskModel
}