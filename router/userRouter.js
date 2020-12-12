module.exports = (app, utils, database) => {

    app.get("/users/get/:username", utils.checkAuthenticated, async (req, res) => {
        console.log(`Getting user profile of ${req.params.username}`);
        const result = await database.authenticateUser(req.params.username);
        if (!result) {
            console.log("User does not exist");
            res.sendStatus(400);
        } else {
            console.log("Load user information success");
            res.status(200).json(result);
        }
    });

    app.put("/users/favorite", utils.checkAuthenticated, async (req, res) => {
       console.log(`Adding apartment to user ${req.body.username}`);
       try {
           await database.addFavorite(req.body.apartment, req.body.username);
           console.log("Add favorite success!");
           res.sendStatus(200);
       } catch (err) {
           res.sendStatus(500);
           throw err;
       }
    });

    app.post("/users/favorite", utils.checkAuthenticated, async (req, res) => {
        console.log(`Deleting apartment to user ${req.body.username}`);
        try {
            await database.deleteFavorite(req.body.apartment, req.body.username);
            console.log("delete favorite success!");
            res.sendStatus(200);
        } catch (err) {
            res.sendStatus(500);
            throw err;
        }
    });
};