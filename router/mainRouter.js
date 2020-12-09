

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
            res.sendStatus(500)
        }
    });

};