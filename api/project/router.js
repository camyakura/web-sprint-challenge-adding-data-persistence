// build your `/api/projects` router here
const express = require('express')
const Project = require('./model')
const { validateName } = require('./middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const projects = await Project.get()
        const updateBoolean = projects.map(project => {
            return {...project, project_completed: project.project_completed ? true : false}
        })
        res.json(updateBoolean)
    } catch(err) {
        next(err)
    }
})

router.post('/', validateName, async (req, res, next) => {
    try {
        const newProject = await Project.create(req.body)
        res.status(201).json({...newProject, project_completed: newProject.project_completed ? true : false})
    } catch(err) {
        next(err)
    }
})


module.exports = router