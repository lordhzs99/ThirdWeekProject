import { PrismaClient } from '../generated/prisma/index.js'
import cors from 'cors';
import express from 'express';
const prisma = new PrismaClient()
const router = express.Router()



router.get('/board/:id/card', cors(), async (req, res) => {
    // console.log("here")
    try {
      const card = await prisma.card.findMany({
      })
      res.json(card)
    } catch (error) {
      res.status(500).send('Server Error')
    }
}) 


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

export default router