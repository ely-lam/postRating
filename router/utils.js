// this module has some useful util function for the main logic.
module.exports = {
    checkAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/");
    },


};
