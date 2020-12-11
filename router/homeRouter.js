

module.exports = (app, utils, database) => {

    app.get("/get-apts", utils.checkAuthenticated, async (req,res) => {
        console.log("Fetching posts");
        try {
            let result = await database.getAllPosts();
            if (result) {
                console.log("Get posts");
                res.status(200).json(result);
            } else {
                console.log("Get posts fail");
                res.sendStatus(400);
            }
        } catch (err) {
            res.sendStatus(500)
        }
    })


};