const express = require('express');
const minionRouter = express.Router();
const workRouter = express.Router({mergeParams: true});

const   
    {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
    } = require('./db')


minionRouter.use('/:minionId/work',workRouter)

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
        newMinionError.status=400;
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
// GET /api/minions/:minionId/work to get an array of all work for the specified minion.
workRouter.get('/',(req,res,next)=>{
    const allWork = getAllFromDatabase('work')
    const minionWork = allWork.filter(e=>e.minionId==req.minionId)
    res.send(minionWork)
})

// POST /api/minions/:minionId/work to create a new work object and save it to the database.
workRouter.post('/',(req, res, next) => {
    const newWork = addToDatabase('work',req.body)
    if (!newWork){
        let newWorkError =  new Error('Work creation failed!');
        newWorkError.status=403;
        return next(newWorkError);
    }
    res.status(201).send(newWork);
});
// extract the work object based on the work id return 404 if it can't be found.
workRouter.param('workId',(req, res, next, id) => {
    const work = getFromDatabaseById('work',id)
    if (!work){
        let workError =  new Error('Work not found!');
        workError.status = 404;
        return next(workError);
    }
    if(work.minionId!==req.minionId){
        let workError =  new Error('Wrong :minionId is requested!');
        workError.status = 400;
        return next(workError);
    }
    req.work = work;
    req.workId= id;
    next();
});
// PUT /api/minions/:minionId/work/:workId to update a single work by id.
workRouter.put('/:workId',(req, res, next) => {
    const newWork = updateInstanceInDatabase('work',{...req.work,...req.body})
    res.send(newWork);
});
// DELETE /api/minions/:minionId/work/:workId to delete a single work by id.

workRouter.delete('/:workId',(req, res, next) =>{
    if(deleteFromDatabasebyId('work',req.workId)){
        res.status(204).send();
        return;
    }
    let minionError =  new Error('Failed to delete Minion!');
    return next(minionError);

})