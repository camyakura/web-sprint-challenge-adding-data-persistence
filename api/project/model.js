const db = require('../../data/dbConfig')

function get() {
    return db('projects')
}

function getById(id) {
    return db('projects').where('project_id', id).first()
}

function create (project) {
    return db('projects').insert(project)
        .then(([id]) => { 
            return getById(id)
        })
}

module.exports = {
    get,
    getById,
    create,
}
