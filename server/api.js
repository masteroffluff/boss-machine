const express = require('express');
const apiRouter = express.Router();

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

// /api/minions
const minionRouter = express.Router();
apiRouter.use('/minions',minionRouter)  
// GET /api/minions to get an array of all minions.
minionRouter.get('/',(req, res, next) => {
    res.send(getAllFromDatabase('minions'))
});
// POST /api/minions to create a new minion and save it to the database.
minionRouter.post('/',(req, res, next) => {
    const newMinion = addToDatabase('minions',req.body)
    if (!newMinion){
        let newMinionError =  new Error('Minion creation failed!');
        newMinionError.status=403;
        return next(newMinionError);
    }
    res.status(201).send(newMinion);
});

// summon a minion based on id or throw an error 
minionRouter.param('minionId',(req, res, next, id) => {
    const minion = getFromDatabaseById('minions',id)
    if (!minion){
        let minionError =  new Error('Minion not found!');
        minionError.status = 404;
        return next(minionError);
    }
    req.minion = minion;
    req.minionId= id;
    next();
});
// GET /api/minions/:minionId to get a single minion by id.
minionRouter.get('/:minionId',(req, res, next) => {
    res.send(req.minion);
});
// PUT /api/minions/:minionId to update a single minion by id.
minionRouter.put('/:minionId',(req, res, next) => {
    const newMinion = updateInstanceInDatabase('minions',{...req.minion,...req.body})
    res.send(newMinion);
});

// DELETE /api/minions/:minionId to delete a single minion by id.
minionRouter.delete('/:minionId',(req, res, next) =>{
    if(deleteFromDatabasebyId('minions',req.minionId)){
        res.status(204).send();
        return;
    }
    let minionError =  new Error('Failed to delete Minion!');
    return next(minionError);

})

// /api/ideas

// GET /api/ideas to get an array of all ideas.

// POST /api/ideas to create a new idea and save it to the database.
// GET /api/ideas/:ideaId to get a single idea by id.
// PUT /api/ideas/:ideaId to update a single idea by id.
// DELETE /api/ideas/:ideaId to delete a single idea by id.

// /api/meetings

// GET /api/meetings to get an array of all meetings.
// POST /api/meetings to create a new meeting and save it to the database.
// DELETE /api/meetings to delete all meetings from the database.


