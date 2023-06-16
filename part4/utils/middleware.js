const jwt = require('jsonwebtoken');
const logger = require('./logger');
const User = require('../models/user');

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const tokenExtractor = (request, response, next) => {
    // code that extracts the token
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer')){
        request.token = authorization.replace('Bearer ', '')
    } else request.token = null

    next()
}

const userExtractor = (request, response, next) => {
    // code that extracts the user
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (decodedToken.id){
        const user = await User.findById(decodedToken.id)
        request.user = user
    } else request.user = null

    next()
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
}
