const Resource = require('./model')

const validateName = async (req, res, next) => {
    const {resource_name} = req.body
    const resource = await Resource.getByName(resource_name)
    if(resource) {
        res.status(400).json({message: `There already is a resource with a name of ${resource_name}`})
    } else {
        next()
    }
}

module.exports = {
    validateName,
}