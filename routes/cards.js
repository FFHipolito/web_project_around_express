const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "..", "data", "cards.json"),
    "utf8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Erro interno do servidor" });
        return;
      }

      const cards = JSON.parse(data);
      res.json(cards);
    }
  );
});

module.exports = router;
