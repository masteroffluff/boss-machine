const express = require('express');
const meetingRouter = express.Router();

const   
    {createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase
    } = require('./db')


module.exports=meetingRouter;

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
    res.status(204).send()
});

