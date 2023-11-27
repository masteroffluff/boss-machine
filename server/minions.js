const express = require('express');
const minionRouter = express.Router();

const   
    {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
    } = require('./db')


module.exports= minionRouter;
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

