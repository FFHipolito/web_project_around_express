const express = require("express");
const app = express();
const PORT = 3000;
const cardsRouter = require("./routes/cards");
const usersRouter = require("./routes/users");

app.use("/cards", cardsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("I am Developer!");
});

app.use((req, res) => {
  res.status(404).json({ message: "A solicitação não foi encontrada" });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
