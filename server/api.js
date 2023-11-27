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


const meetingRouter = express.Router();
// /api/meetings
apiRouter.use('/meetings',meetingRouter);

// GET /api/meetings to get an array of all meetings.
meetingRouter.get("/",(req,res,next)=>{
    res.send(getAllFromDatabase('meetings'))
})
// POST /api/meetings to create a new meeting and save it to the database.
meetingRouter.post('/',(req, res, next) => {
    const newMeeting = addToDatabase('meetings',createMeeting())
    //const newMeeting = createMeeting();
    if (!newMeeting){
        let newIdeaError =  new Error('Meeting creation failed!');
        newIdeaError.status=403;
        return next(newIdeaError);
    }
    res.status(201).send(newMeeting);
});
// DELETE /api/meetings to delete all meetings from the database.
meetingRouter.delete('/',(req,res,next)=>{
    deleteAllFromDatabase('meetings')
    res.send(204)
})

