const db = require('../../data/dbConfig')

function get() {
    return db('tasks').leftJoin('projects', 'tasks.project_id', 'projects.project_id')
    .select('task_id', 'task_description', 'task_notes', 'task_completed', 'project_name', 'project_description')
}

function create(task) {
    return db('tasks').insert(task)
        .then(([id]) => {
            return db('tasks').where('task_id', id).first()
        })
}

module.exports = {
    get,
    create,
}