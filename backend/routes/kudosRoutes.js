import { PrismaClient } from '../generated/prisma/index.js'
import cors from 'cors';
import express from 'express';
const prisma = new PrismaClient()
const router = express.Router()


router.get('/board', cors(), async (req, res) => {
    // console.log("here")
    try {
      const board = await prisma.board.findMany({
      })
      res.json(board)
    } catch (error) {
      res.status(500).send('Server Error')
    }
}) 

router.get('/board/:id', cors(), async (req, res) => {
    // console.log("HEREEEE")
    const boardId = parseInt(req.params.id)
    try {
        const board = await prisma.board.findUnique({
            where: {
                id: boardId,
            },
        })
        if (board) {
            res.json(board)
        } else {
            res.status(404).send('board not found')
        }
    } catch (error) {
        res.status(500).send('An error occurred while fetching the board.')
    }
})

router.post('/board', async (req, res) => {
  const { title, category, creator } = req.body
  const newBoard = await prisma.board.create({
    data: {
      title,
      category, 
      creator
    }
  })
  res.json(newBoard)
})

router.delete('/board/:id', async (req, res) => {
  const { id } = req.params
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(id) }
  })
  res.status(204).send()
})

export default router;