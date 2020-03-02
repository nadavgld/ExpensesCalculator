const express = require("express");
const router = express.Router();

const LogModel = require("../models/Log");

router.get("/", async (req, res) => {
  res.send(await LogModel.find({}).sort({timestamp: -1}));
});

router.get("/type/:type", async (req, res) => {
  const type = req.params.type;

  res.send(await LogModel.find({ category: type }));
});

router.post("/", async (req, res) => {
  const { log } = req.body;
  const newLog = new LogModel(log);

  newLog
    .save()
    .then(savedLog => {
      res.send(savedLog);
    })
    .catch(err => {
      res.status(500).send({ err });
    });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  LogModel.deleteOne({ _id: id }, e => {
    if (e) {
      res.status(500).send({ err: e });
      return;
    }

    res.send({ success: true });
  });
});

module.exports = router;
