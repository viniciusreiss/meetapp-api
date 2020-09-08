import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import User from '@database/models/User'

const createSession = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await User.findOne({ where: { email } })

  if (!user) {
    return res.status(401).json({ error: 'User not found' })
  }

  if (!(await user.passwordCheck(password))) {
    return res.status(401).json({ error: 'Password does not match' })
  }

  const { id, name } = user

  return res.json({
    user: {
      id,
      name,
      email
    },
    token: jwt.sign({ id }, 'meetapp', {
      expiresIn: '1d'
    })
  })
}

export { createSession }
