const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "data", "users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Erro interno do servidor" });
        return;
      }

      const users = JSON.parse(data);
      res.json(users);
    }
  );
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;

  fs.readFile(
    path.join(__dirname, "..", "data", "users.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Erro interno do servidor" });
        return;
      }

      const users = JSON.parse(data);
      const user = users.find((user) => user._id === userId);

      if (!user) {
        res.status(404).json({ message: "ID do usuário não encontrado" });
        return;
      }

      res.json(user);
    }
  );
});

module.exports = router;
