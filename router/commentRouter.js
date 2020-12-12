module.exports = (app, utils, database) => {
  app.get(
    "/comments/get/:apartmentId",
    utils.checkAuthenticated,
    async (req, res) => {
      const result = await database.getPost(req.params.apartmentId);
      if (!result) {
        console.log(`Getting comments for ${req.params.apartmentId} failed.`);
        res.sendStatus(400);
      } else {
        console.log(`Getting comments for ${req.params.apartmentId} Success.`);
        res.status(200).json(result);
      }
    }
  );

  app.put("/comments/add", utils.checkAuthenticated, async (req, res) => {
    console.log(`Receiving adding comment request for ${req.body.username}`);
    try {
      await database.addComment(req.body);
      console.log(`Adding comment of ${req.body.username} success!`);
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });
};
