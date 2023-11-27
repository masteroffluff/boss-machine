const checkMillionDollarIdea = (req, res, next) =>{
    const {numWeeks,weeklyRevenue} = req.body;
    
    totalRevenue = Number(numWeeks)*Number(weeklyRevenue);

    if(!totalRevenue||totalRevenue<1000000){
        res.status(400).send("Idea does not generate a milion dollars!")
        return
    }
    next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;

