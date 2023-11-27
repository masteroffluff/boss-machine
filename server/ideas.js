// /api/ideas
const express = require('express');
const ideaRouter = express.Router();
const   
    {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    } = require('./db')



module.exports = ideaRouter;
// GET /api/ideas to get an array of all ideas.
ideaRouter.get('/',(req, res, next) => {
    res.send(getAllFromDatabase('ideas'))
});


// POST /api/ideas to create a new idea and save it to the database.
const checkMillionDollarIdea = require('./checkMillionDollarIdea')
ideaRouter.post('/',checkMillionDollarIdea,(req, res, next) => {
    const newIdea = addToDatabase('ideas',req.body)
    if (!newIdea){
        let newIdeaError =  new Error('Idea creation failed!');
        newIdeaError.status=403;
        return next(newIdeaError);
    }
    res.status(201).send(newIdea);
});

ideaRouter.param('ideaId',(req, res, next, id) => {
    const idea = getFromDatabaseById('ideas',id)
    if (!idea){
        let ideaError =  new Error('Idea not found!');
        ideaError.status = 404;
        return next(ideaError);
    }
    req.idea = idea;
    req.ideaId= id;
    next();
});

// GET /api/ideas/:ideaId to get a single idea by id.
ideaRouter.get('/:ideaId',(req, res, next) => {
    res.send(req.idea);
});
// PUT /api/ideas/:ideaId to update a single idea by id.
// PUT /api/minions/:minionId to update a single minion by id.
ideaRouter.put('/:ideaId',(req, res, next) => {
    const newIdea = updateInstanceInDatabase('ideas',{...req.idea,...req.body})
    res.send(newIdea);
});
// DELETE /api/ideas/:ideaId to delete a single idea by id.
ideaRouter.delete('/:ideaId',(req, res, next) =>{
    if(deleteFromDatabasebyId('ideas',req.ideaId)){
        res.status(204).send();
        return;
    }
    let ideaError =  new Error('Failed to delete Minion!');
    return next(ideaError);

})