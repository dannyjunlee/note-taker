const apiRouter = require('express').Router();
const notesRouter = require('./notesRouter');

apiRouter.use('/notes', notesRouter);

module.exports = apiRouter;