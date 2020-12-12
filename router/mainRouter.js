

module.exports = (app, passport, utils,database) => {

    // This router handles the sign in request of user
    app.post("/sign-up", async (req, res) => {
        console.log(`Receiving sign up request for ${req.body.username}`);
        try {
            let result = await database.createUser(req.body);
            if (result) {
                console.log(`Sign up of ${req.body.username} success!`);
                res.sendStatus(200)
            } else {
                console.log(`Sign up of ${req.body.username} fail!`);
                res.sendStatus(400);
            }
        } catch (err) {
            res.sendStatus(500);
            throw err;
        }
    });

    // This router handle the login request. Note that we have change the get request to actual post request.
    app.post("/login", passport.authenticate("local"), (req, res) => {
        console.log(`Authenticate user ${req.user.username} success`);
        res.status(200).json(req.user);
    });

    // This router handle the logout request.
    app.get("/logout", utils.checkAuthenticated, (req, res) => {
        req.logout();
        console.log("Logout user success!");
        res.redirect("/");
    });

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
            throw err;
        }
    })

};