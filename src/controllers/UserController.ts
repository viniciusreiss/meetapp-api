import User from 'src/database/models/User'
import Joi from 'joi'
import { paths, pick } from 'ramda'
import { Request, Response } from 'express'

const createUser = async (req: Request, res: Response) => {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().min(8).required(),
    email: Joi.string().email().required()
  })

  const { error } = userSchema.validate(req.body)

  if (error) {
    const message = paths([['message']], error)
    return res.status(400).json({ message: `Validation error ${message}` })
  }

  const userAlreadyExists = await User.findOne({
    where: { email: req.body.email }
  })

  if (userAlreadyExists) {
    res.status(400).json({ error: 'User already exists' })
    return undefined
  }

  try {
    await User.create(req.body)
    return res.status(200).json({})
  } catch (error) {
    return res.status(400).json({ message: 'Bad request' })
  }
}

export { createUser }
