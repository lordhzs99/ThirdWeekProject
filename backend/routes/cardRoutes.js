import { PrismaClient } from '../generated/prisma/index.js'
import cors from 'cors';
import express from 'express';
const prisma = new PrismaClient()
const router = express.Router()


router.get('/board/:id/card', cors(), async (req, res) => {
  try {
    const boardId = Number(req.params.id); // Convert to number, since Prisma expects an int
    const cards = await prisma.card.findMany({
      where: {
        board_id: boardId,
      },
    });
    res.json(cards);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


router.post('/board/:id/card', async (req, res) => {
  console.log("card creation")
  const { title, description, gif, author, board_id } = req.body
  const newCard = await prisma.card.create({
    data: {
      title,
      description, 
      gif, 
      author,
      board_id
    }
  })
  res.json(newCard)
})


router.delete('/board/:id/card/:card_id', async (req, res) => {
  console.log("deletedcard");
  const { card_id } = req.params
  const deletedcard = await prisma.card.delete({
    where: { card_id: parseInt(card_id) }
  })
  res.status(204).send()
})

router.put('/board/:id/card/:card_id/votes', async (req, res) => {
  try {
    const { card_id } = req.params;

    // Increment the card's votes by 1
    const updatedCard = await prisma.card.update({
      where: { card_id: parseInt(card_id) },
      data: { votes: { increment: 1 } },
    });

    res.json(updatedCard);
  } catch (error) {
    if (error.code === 'P2025') { // Prisma not found error
      res.status(404).send('Card not found');
    } else {
      res.status(500).send('Server Error');
    }
  }
});

export default router