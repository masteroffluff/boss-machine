const express = require('express');
const apiRouter = express.Router();

const minionRouter = require('./minions')
const ideaRouter = require('./ideas')

const   
    {createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase
    } = require('./db')

module.exports = apiRouter;

apiRouter.use('/minions',minionRouter);
apiRouter.use('/ideas',ideaRouter);



// /api/meetings

// GET /api/meetings to get an array of all meetings.
// POST /api/meetings to create a new meeting and save it to the database.
// DELETE /api/meetings to delete all meetings from the database.


