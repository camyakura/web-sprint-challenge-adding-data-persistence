const express = require('express')
const Task = require('./model')
const { validate, validateId } = require('./middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.get()
        const updateBoolean = tasks.map(task => {
            return {...task, task_completed: task.task_completed ? true : false}
        })
        res.json(updateBoolean)
    } catch(err) {
        next(err)
    }
})

router.post('/', validate, validateId, async (req, res, next) => {
    try {
        const newTask = await Task.create(req.body)
        res.status(201).json({...newTask, task_completed: newTask.task_completed ? true : false})
    } catch(err) {
        next(err)
    }
})

module.exports = router