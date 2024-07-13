const Card = require("../models/card");

async function getCards(req, res) {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createCard(req, res) {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  try {
    const newCard = new Card({ name, link, owner: ownerId });
    const savedCard = await newCard.save();
    res.status(201).json(savedCard);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Dados inválidos..." });
    }
    res.status(500).json({ message: error.message });
  }
}

async function deleteCardById(req, res) {
  const cardId = req.params.cardId;
  try {
    const deleteCardById = await Card.findByIdAndDelete(cardId).orFail(() => {
      const error = new Error("Card não encontrado");
      error.statusCode = 404;
      throw error;
    });
    res.json({ message: "Card deletado com sucesso" });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
}

async function likeCard(req, res) {
  const userId = req.user._id;
  const cardId = req.params.cardId;
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    if (!updatedCard) {
      return res.status(404).json({ message: "Card não encontrado" });
    }
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function dislikeCard(req, res) {
  const userId = req.user._id;
  const cardId = req.params.cardId;
  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: userId } },
      { new: true }
    );
    if (!updatedCard) {
      return res.status(404).json({ message: "Card não encontrado" });
    }
    res.json(updatedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
