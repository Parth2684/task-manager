const mongoose = require("mongoose")
const Schema = mongoose.Schema

const adminSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tasks: [{
        type: mongoose.Schema.type.ObjectId,
        ref: taskModel
    }],
    employees: [{
        type: mongoose.Schema.type.ObjectId,
        ref: employeeModel
    }]
})

const employeeSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    tasks: [{
        type: mongoose.Schema.type.ObjectId,
        ref: taskModel
    }]
})

const taskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    taskCompleted: {type: Boolean, default: false},
    assignedFrom: {
        type: mongoose.Schema.type.ObjectId,
        ref: adminModel
    },
    assignedTo: [{
        type: mongoose.Schema.type.ObjectId,
        ref: employeeModel
    }]
})

const adminModel= mongoose.model('admin', adminSchema)
const employeeModel = mongoose.model('employee', employeeSchema)
const taskModel = mongoose.model('task', taskSchema)

module.exports= {
    adminModel,
    employeeModel,
    taskModel
}